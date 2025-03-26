import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

// Define el tipo para las propiedades de navegación
type SplashScreenProps = {
  navigation: NavigationProp<any>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Si hay un token, redirigir a Home
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { token } }],
        });
      } else {
        // Si no hay token, redirigir a Login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;