import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { supabase } from '../../lib/supabase'
import { cores } from '../../theme'

type Props = { navigation: NativeStackNavigationProp<any> }

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar() {
    if (!email || !senha) { Alert.alert('Preencha email e senha'); return }
    setCarregando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setCarregando(false)
    if (error) Alert.alert('Erro ao entrar', error.message)
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={estilos.titulo}>Guia do Aluno</Text>
      <Text style={estilos.subtitulo}>FACSENAC DF</Text>

      <TextInput
        style={estilos.input}
        placeholder="Email"
        placeholderTextColor={cores.cinza}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={estilos.input}
        placeholder="Senha"
        placeholderTextColor={cores.cinza}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.botao} onPress={entrar} disabled={carregando}>
        {carregando
          ? <ActivityIndicator color="#fff" />
          : <Text style={estilos.botaoTexto}>Entrar</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={estilos.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: cores.preto, textAlign: 'center' },
  subtitulo: { fontSize: 16, color: cores.laranja, textAlign: 'center', marginBottom: 40 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 8,
    padding: 14, marginBottom: 12, fontSize: 16, color: cores.preto, backgroundColor: '#fff',
  },
  botao: { backgroundColor: cores.laranja, borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: cores.laranja, textAlign: 'center', marginTop: 20, fontSize: 14 },
})
