import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from '../axiosConfig';
import { RouteProp } from '@react-navigation/native';

// Define el tipo para una criptomoneda
type Crypto = {
  id: number;
  name: string;
  ticker: string;
  purchase_price: number;
  purchase_quantity: number;
  invested_amount: number;
};

// Define el tipo para las propiedades de la ruta
type EditCryptoScreenRouteProp = RouteProp<{ params: { token: string; crypto: Crypto } }, 'params'>;

// Define el tipo para las propiedades del componente
type EditCryptoScreenProps = {
  route: EditCryptoScreenRouteProp;
};

const EditCryptoScreen: React.FC<EditCryptoScreenProps> = ({ route }) => {
  const { token, crypto } = route.params; // Recibimos el token y los datos de la criptomoneda

  // Estados para los campos del formulario
  const [name, setName] = useState<string>(crypto.name);
  const [ticker, setTicker] = useState<string>(crypto.ticker);
  const [purchasePrice, setPurchasePrice] = useState<string>(crypto.purchase_price.toString());
  const [purchaseQuantity, setPurchaseQuantity] = useState<string>(crypto.purchase_quantity.toString());

  const handleSubmit = async () => {
    const investedAmount = parseFloat(purchasePrice) * parseFloat(purchaseQuantity);
    try {
      await axios.put(
        `/cryptos/${crypto.id}`,
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
        text2: 'Criptomoneda editada correctamente.',
      });
    } catch (error) {
      // Mostrar toast de error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo editar la criptomoneda.',
      });
      console.error('Error al editar criptomoneda', error);
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
        <Text style={styles.buttonText}>Guardar cambios</Text>
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

export default EditCryptoScreen;