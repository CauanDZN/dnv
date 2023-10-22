import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/auth/AuthContext'; // Importe o AuthProvider

import HomeScreen from './src/screens/HomeScreen';
import ReportScreen from './src/screens/ReportScreen';
import AdminScreen from './src/screens/AdminScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Objeto de tradução de nomes de rotas
const routeTranslation = {
  Início: 'Início',
  Cadastro: 'Cadastro',
  Relatório: 'Relatório',
  Histórico: 'Histórico',
  Admin: 'Admin',
};

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está autenticado (por exemplo, se tem um token válido)
    async function checkAuthentication() {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Supondo que 'userToken' seja a chave do token
        if (token) {
          setUserAuthenticated(true);
        } else {
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkAuthentication();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
      {/* {userAuthenticated ? ( // Se o usuário estiver autenticado
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: routeTranslation[route.name], // Use o objeto de tradução
            tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
            tabBarStyle: { justifyContent: 'center', alignItems: 'center' },
            tabBarActiveTintColor: 'orange',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} options={{ headerTitle: 'Início' }} />
          <Tab.Screen name="Cadastro" component={RegistrationScreen} options={{ headerTitle: 'Cadastro' }} />
          <Tab.Screen name="Relatório" component={ReportScreen} options={{ headerTitle: 'Relatório' }} />
          <Tab.Screen name="Histórico" component={HistoryScreen} options={{ headerTitle: 'Histórico' }} />
          <Tab.Screen name="Admin" component={AdminScreen} options={{ headerTitle: 'Admin' }} />
        </Tab.Navigator>
      ) : ( // Se o usuário não estiver autenticado, mostra apenas a tela de cadastro
        <Stack.Navigator initialRouteName="Cadastro">
          <Stack.Screen name="Cadastro" component={SignUpScreen} />
        </Stack.Navigator>
      )} */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: routeTranslation[route.name], // Use o objeto de tradução
            tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
            tabBarStyle: { justifyContent: 'center', alignItems: 'center' },
            tabBarActiveTintColor: 'orange',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} options={{ headerTitle: 'Início' }} />
          <Tab.Screen name="Relatório" component={ReportScreen} options={{ headerTitle: 'Relatório' }} />
          <Tab.Screen name="Admin" component={AdminScreen} options={{ headerTitle: 'Admin' }} />
        </Tab.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}

// Função para configurar os ícones
function getTabBarIcon(routeName, color, size) {
  let iconName;

  if (routeName === 'Início') {
    iconName = 'home';
  } else if (routeName === 'Cadastro') {
    iconName = 'person';
  } else if (routeName === 'Relatório') {
    iconName = 'document-text';
  } else if (routeName === 'Histórico') {
    iconName = 'time';
  } else if (routeName === 'Admin') {
    iconName = 'settings';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default App;
