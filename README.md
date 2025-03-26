# Crypto Challenge - Frontend

Aplicación móvil desarrollada en **React Native** para la gestión de criptomonedas. Permite a los usuarios registrarse, iniciar sesión, agregar, editar y eliminar criptomonedas, con autenticación basada en tokens y almacenamiento seguro.

---

## ✨ Características

- **Autenticación**: Registro e inicio de sesión con almacenamiento seguro del token.
- **Gestión de criptomonedas**: Agregar, editar y eliminar criptomonedas.
- **Interfaz amigable**: Navegación fluida entre pantallas como Login, Registro, Home, Creación y Edición.
- **Notificaciones**: Uso de `react-native-toast-message` para mostrar mensajes de éxito o error.

---

## ⚙️ Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 20 o superior)
- **Expo CLI** (instalado globalmente)
- **Git** (para clonar el repositorio)

---

## 🚀 Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/andreshaitit/crypo-challenge-frontend.git
    cd crypo-challenge-frontend
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y define la URL base de tu API:

    ```env
    EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000
    ```

---

## 🛠️ Uso

1. Inicia el servidor de desarrollo de Expo:

    ```bash
    npm start
    ```

2. Escanea el código QR con la aplicación **Expo Go** en tu dispositivo móvil o ejecuta la app en un emulador:

    - **Android**: `npm run android`
    - **iOS**: `npm run ios`
    - **Web**: `npm run web`

---

## 📦 Dependencias principales

- **React Native**: Framework para desarrollo móvil.
- **React Navigation**: Manejo de navegación entre pantallas.
- **Axios**: Cliente HTTP para consumir la API.
- **AsyncStorage**: Almacenamiento seguro para el token de autenticación.
- **react-native-toast-message**: Notificaciones de éxito y error.

---

## 🗂️ Estructura del proyecto

```plaintext
crypto-frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── screens/          # Pantallas principales (Login, Home, etc.)
│   ├── axiosConfig.ts    # Configuración de Axios
├── [App.tsx](http://_vscodecontentref_/1)               # Punto de entrada de la aplicación
├── .env                  # Variables de entorno
├── [package.json](http://_vscodecontentref_/2)          # Dependencias y scripts