import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashSreen';
import HomeScreen from './src/screens/HomeScreen';
import AddCryptoScreen from './src/screens/AddCryptoScreen';
import EditCryptoScreen from './src/screens/EditCryptoScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Pantalla de Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }} // Cambiar título a español
        />
        {/* Pantalla de Register */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrarse' }} // Cambiar título a español
        />
        {/* Pantalla principal */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }} // Cambiar título a español
        />
        {/* Pantalla para agregar criptomonedas */}
        <Stack.Screen
          name="AddCrypto"
          component={AddCryptoScreen}
          options={{ title: 'Agregar Criptomoneda' }} // Cambiar título a español
        />
        {/* Pantalla para editar criptomonedas */}
        <Stack.Screen
          name="EditCrypto"
          component={EditCryptoScreen}
          options={{ title: 'Editar Criptomoneda' }} // Cambiar título a español
        />
      </Stack.Navigator>
      {/* Toast para notificaciones */}
      <Toast
        position="top"
        visibilityTime={3000}
        autoHide={true}
        topOffset={50}
        bottomOffset={40}
      />
    </NavigationContainer>
  );
}
