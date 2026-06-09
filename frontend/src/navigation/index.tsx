import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { cores } from '../theme'

import LoginScreen from '../screens/auth/LoginScreen'
import CadastroScreen from '../screens/auth/CadastroScreen'
import HomeScreen from '../screens/home/HomeScreen'
import CategoriaScreen from '../screens/home/CategoriaScreen'
import ArtigoScreen from '../screens/home/ArtigoScreen'
import CalculadoraScreen from '../screens/calculadora/CalculadoraScreen'
import PresencaScreen from '../screens/presenca/PresencaScreen'
import PerfilScreen from '../screens/perfil/PerfilScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.azul },
        headerTitleStyle: { color: cores.branco, fontWeight: 'bold' },
        headerTintColor: cores.branco,
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Guia do Aluno' }} />
      <Stack.Screen name="Categoria" component={CategoriaScreen} options={({ route }) => ({ title: (route.params as any)?.nome ?? 'Categoria' })} />
      <Stack.Screen name="Artigo" component={ArtigoScreen} options={({ route }) => ({ title: (route.params as any)?.titulo ?? 'Artigo' })} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.azul,
        tabBarInactiveTintColor: cores.cinza,
        tabBarStyle: { backgroundColor: cores.superficie, borderTopColor: cores.borda },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Início', tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} /> }}
      />
      <Tab.Screen
        name="Calculadora"
        component={CalculadoraScreen}
        options={{ title: 'Médias', tabBarIcon: ({ focused }) => <TabIcon emoji="🧮" focused={focused} />, headerShown: true, headerTitle: 'Calculadora de Médias', headerStyle: { backgroundColor: cores.azul }, headerTitleStyle: { color: cores.branco, fontWeight: 'bold' }, headerTintColor: cores.branco }}
      />
      <Tab.Screen
        name="Presenca"
        component={PresencaScreen}
        options={{ title: 'Presença', tabBarIcon: ({ focused }) => <TabIcon emoji="✅" focused={focused} />, headerShown: true, headerTitle: 'Módulo de Presença', headerStyle: { backgroundColor: cores.azul }, headerTitleStyle: { color: cores.branco, fontWeight: 'bold' }, headerTintColor: cores.branco }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil', tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />, headerShown: true, headerTitle: 'Meu Perfil', headerStyle: { backgroundColor: cores.azul }, headerTitleStyle: { color: cores.branco, fontWeight: 'bold' }, headerTintColor: cores.branco }}
      />
    </Tab.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  const { session, loading } = useAuth()

  if (loading) return null

  return (
    <NavigationContainer>
      {session ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
