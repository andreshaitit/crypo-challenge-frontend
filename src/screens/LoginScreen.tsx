import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

// Define el tipo para las propiedades de navegación
type LoginScreenProps = {
  navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>(''); // Tipado como string
  const [password, setPassword] = useState<string>(''); // Tipado como string

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const token = response.data.token;

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Navegar a la pantalla Home y pasar el nombre de usuario
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { token, username } }],
      });
    } catch (error) {
      console.error('Error al iniciar sesión', error);
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
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;