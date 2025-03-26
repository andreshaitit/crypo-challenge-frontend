import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from '../axiosConfig';
import { RouteProp } from '@react-navigation/native';

// Define el tipo para las propiedades de la ruta
type AddCryptoScreenRouteProp = RouteProp<{ params: { token: string } }, 'params'>;

// Define el tipo para las propiedades del componente
type AddCryptoScreenProps = {
  route: AddCryptoScreenRouteProp;
};

const AddCryptoScreen: React.FC<AddCryptoScreenProps> = ({ route }) => {
  const { token } = route.params;

  // Estados para los campos del formulario
  const [name, setName] = useState<string>(''); // Tipado como string
  const [ticker, setTicker] = useState<string>(''); // Tipado como string
  const [purchasePrice, setPurchasePrice] = useState<string>(''); // Tipado como string
  const [purchaseQuantity, setPurchaseQuantity] = useState<string>(''); // Tipado como string

  const handleSubmit = async () => {
    const investedAmount = parseFloat(purchasePrice) * parseFloat(purchaseQuantity);
    try {
      await axios.post(
        '/cryptos',
        {
          name,
          ticker,
          purchase_price: parseFloat(purchasePrice),
          purchase_quantity: parseFloat(purchaseQuantity),
          invested_amount: investedAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mostrar toast de éxito
      Toast.show({
        type: 'success',
        text1: '¡Éxito!',
        text2: 'Criptomoneda agregada correctamente.',
      });

      // Limpiar los campos de entrada
      setName('');
      setTicker('');
      setPurchasePrice('');
      setPurchaseQuantity('');
    } catch (error) {
      // Mostrar toast de error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo agregar la criptomoneda.',
      });
      console.error('Error al agregar criptomoneda', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Ticker:</Text>
      <TextInput
        style={styles.input}
        value={ticker}
        onChangeText={setTicker}
      />
      <Text style={styles.label}>Precio de compra:</Text>
      <TextInput
        style={styles.input}
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Cantidad de compra:</Text>
      <TextInput
        style={styles.input}
        value={purchaseQuantity}
        onChangeText={setPurchaseQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCryptoScreen;