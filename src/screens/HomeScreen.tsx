import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from '../axiosConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect, NavigationProp, RouteProp } from '@react-navigation/native';
import CryptoItem from '../components/CryptoItem';

// Define el tipo para las propiedades de navegación y ruta
type HomeScreenProps = {
  route: RouteProp<{ params: { token: string; username: string } }, 'params'>;
  navigation: NavigationProp<any>;
};

// Define el tipo para una criptomoneda
type Crypto = {
  id: number;
  name: string;
  ticker: string;
  purchase_price: number;
  purchase_quantity: number;
  invested_amount: number;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const token = route.params?.token; // Verificamos si el token existe
  const username = route.params?.username; // Obtenemos el nombre de usuario
  const [cryptos, setCryptos] = useState<Crypto[]>([]); // Tipamos el estado como un array de Crypto
  const [loading, setLoading] = useState<boolean>(true); // Tipamos el estado como booleano

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken'); // Recuperar el token
      const response = await axios.get<Crypto[]>('/cryptos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCryptos(response.data);
    } catch (error) {
      console.error('Error al obtener criptomonedas', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || token.trim() === '') {
      // Si no hay token o es inválido, redirigimos al login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return;
    }

    fetchCryptos();
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCryptos(); // Recargar los datos cada vez que la pantalla gana el foco
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => null,
      headerTitle: username ? `Bienvenido, ${username}` : 'Inicio',
    });
  }, [navigation, username]);

  const handleEdit = (crypto: Crypto) => {
    navigation.navigate('EditCrypto', { token, crypto });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/cryptos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCryptos((prevCryptos) => prevCryptos.filter((crypto) => crypto.id !== id));
      Toast.show({
        type: 'success',
        text1: '¡Éxito!',
        text2: 'Criptomoneda eliminada correctamente.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo eliminar la criptomoneda.',
      });
      console.error('Error al eliminar criptomoneda', error);
    }
  };

  const handleAddCrypto = () => {
    navigation.navigate('AddCrypto', { token });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken'); // Eliminar el token
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <View style={styles.screenContainer}>
      <View style={styles.listContainer}>
        {cryptos.length === 0 ? (
          <Text style={styles.noCryptosText}>No hay criptomonedas</Text>
        ) : (
          <FlatList
            data={cryptos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CryptoItem
                id={item.id}
                name={item.name}
                ticker={item.ticker}
                purchase_price={item.purchase_price}
                purchase_quantity={item.purchase_quantity}
                invested_amount={item.invested_amount}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCrypto}>
        <Text style={styles.addButtonText}>Agregar Criptomoneda</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10,
  },
  cryptoItem: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCryptosText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
  },
});

export default HomeScreen;