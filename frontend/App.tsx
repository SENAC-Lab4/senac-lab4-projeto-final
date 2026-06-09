import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/contexts/AuthContext'
import Navigation from './src/navigation'

export default function App() {
  return (
    <AuthProvider>
      {/* Ícones claros para os cabeçalhos azuis; as telas de login sobrescrevem para "dark". */}
      <StatusBar style="light" />
      <Navigation />
    </AuthProvider>
  )
}
