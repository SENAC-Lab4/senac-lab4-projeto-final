import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
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
      <StatusBar style="dark" />

      <LinearGradient
        colors={cores.gradiente}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={estilos.hero}
      >
        <Text style={estilos.heroTitulo}>Guia do Aluno</Text>
        <View style={estilos.heroLinha} />
        <Text style={estilos.heroSubtitulo}>FACSENAC DF</Text>
      </LinearGradient>

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
          ? <ActivityIndicator color={cores.branco} />
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
  hero: {
    borderRadius: 16, paddingVertical: 32, paddingHorizontal: 24,
    alignItems: 'center', marginBottom: 40,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6,
  },
  heroTitulo: { fontSize: 32, fontWeight: 'bold', color: cores.branco, textAlign: 'center' },
  heroLinha: { width: 48, height: 3, backgroundColor: cores.branco, borderRadius: 2, marginVertical: 12, opacity: 0.9 },
  heroSubtitulo: { fontSize: 16, color: cores.branco, textAlign: 'center', letterSpacing: 2, fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 8,
    padding: 14, marginBottom: 12, fontSize: 16, color: cores.preto, backgroundColor: cores.superficie,
  },
  botao: { backgroundColor: cores.laranja, borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
  link: { color: cores.azul, textAlign: 'center', marginTop: 20, fontSize: 14, fontWeight: '600' },
})
