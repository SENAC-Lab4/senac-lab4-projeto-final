import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { cores } from '../../theme'

export default function PerfilScreen() {
  const { session, funcao, signOut } = useAuth()

  const email = session?.user?.email ?? '—'

  function confirmarSaida() {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: signOut },
    ])
  }

  const labelFuncao: Record<string, string> = {
    estudante: 'Estudante',
    professor: 'Professor',
    admin: 'Administrador',
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.avatar}>
        <Text style={estilos.avatarLetra}>{email[0]?.toUpperCase() ?? '?'}</Text>
      </View>

      <Text style={estilos.email}>{email}</Text>
      {funcao && (
        <View style={estilos.badge}>
          <Text style={estilos.badgeTexto}>{labelFuncao[funcao] ?? funcao}</Text>
        </View>
      )}

      <TouchableOpacity style={estilos.botaoSair} onPress={confirmarSaida}>
        <Text style={estilos.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center', padding: 24 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: cores.laranja, justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  avatarLetra: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  email: { fontSize: 16, color: cores.preto, marginBottom: 12 },
  badge: {
    backgroundColor: cores.laranja + '20', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6, marginBottom: 40,
  },
  badgeTexto: { color: cores.laranja, fontWeight: 'bold', fontSize: 13 },
  botaoSair: {
    borderWidth: 1, borderColor: '#dc2626', borderRadius: 8,
    paddingVertical: 14, paddingHorizontal: 48,
  },
  botaoSairTexto: { color: '#dc2626', fontWeight: 'bold', fontSize: 15 },
})
