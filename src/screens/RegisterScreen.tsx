// filepath: c:\Users\andre\OneDrive\Escritorio\Crypto Challenge\crypto-backend\crypto-frontend\src\screens\RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from '../axiosConfig';
import { NavigationProp } from '@react-navigation/native';

// Define el tipo para las propiedades de navegación
type RegisterScreenProps = {
  navigation: NavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>(''); // Tipado como string
  const [password, setPassword] = useState<string>(''); // Tipado como string

  const handleSubmit = async () => {
    try {
      await axios.post('/auth/register', { username, password });

      // Mostrar toast de éxito
      Toast.show({
        type: 'success',
        text1: '¡Registro exitoso!',
        text2: 'Tu cuenta ha sido creada correctamente.',
        position: 'top',
        autoHide: false,
        onPress: () => {
          Toast.hide(); // Ocultar el toast al presionar
          navigation.navigate('Login'); // Redirigir al login
        },
      });

      // Limpiar los campos de entrada
      setUsername('');
      setPassword('');
    } catch (error) {
      // Mostrar toast de error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo completar el registro.',
      });
      console.error('Error al registrarse', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de usuario:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;