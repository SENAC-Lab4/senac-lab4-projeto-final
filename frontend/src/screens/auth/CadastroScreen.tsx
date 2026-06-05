import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { supabase } from '../../lib/supabase'
import { cores } from '../../theme'

type Props = { navigation: NativeStackNavigationProp<any> }

export default function CadastroScreen({ navigation }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function cadastrar() {
    if (!nomeCompleto || !email || !senha) {
      Alert.alert('Preencha todos os campos')
      return
    }
    setCarregando(true)
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { full_name: nomeCompleto } },
    })
    setCarregando(false)
    if (error) {
      Alert.alert('Erro no cadastro', error.message)
    } else {
      Alert.alert(
        'Quase lá!',
        'Confirme seu email antes de fazer login.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
      )
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={estilos.container}>
        <Text style={estilos.titulo}>Criar conta</Text>

        <TextInput
          style={estilos.input}
          placeholder="Nome completo"
          placeholderTextColor={cores.cinza}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
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

        <TouchableOpacity style={estilos.botao} onPress={cadastrar} disabled={carregando}>
          {carregando
            ? <ActivityIndicator color="#fff" />
            : <Text style={estilos.botaoTexto}>Criar conta</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.link}>Já tem conta? Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const estilos = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: cores.fundo, justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: cores.preto, marginBottom: 32 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 8,
    padding: 14, marginBottom: 12, fontSize: 16, color: cores.preto, backgroundColor: '#fff',
  },
  botao: { backgroundColor: cores.laranja, borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: cores.laranja, textAlign: 'center', marginTop: 20, fontSize: 14 },
})
