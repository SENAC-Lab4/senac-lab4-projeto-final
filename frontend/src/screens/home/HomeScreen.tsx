import React, { useEffect, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, TextInput,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getCategorias, Categoria } from '../../lib/api'
import { categoriasExemplo } from '../../lib/dadosExemplo'
import { cores } from '../../theme'

type Props = { navigation: NativeStackNavigationProp<any> }

export default function HomeScreen({ navigation }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getCategorias()
      .then(lista => setCategorias(lista.length > 0 ? lista : categoriasExemplo))
      .catch(() => setCategorias(categoriasExemplo))
      .finally(() => setCarregando(false))
  }, [])

  const filtradas = categorias.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  )

  if (carregando) {
    return <View style={estilos.centro}><ActivityIndicator size="large" color={cores.laranja} /></View>
  }

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.busca}
        placeholder="Buscar categoria..."
        placeholderTextColor={cores.cinza}
        value={busca}
        onChangeText={setBusca}
      />
      <FlatList
        data={filtradas}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Categoria', { slug: item.slug, nome: item.nome })}
          >
            <Text style={estilos.cardTitulo}>{item.nome}</Text>
            {item.descricao ? <Text style={estilos.cardDesc}>{item.descricao}</Text> : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhuma categoria encontrada.</Text>
        }
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  busca: {
    margin: 16, marginBottom: 0, borderWidth: 1, borderColor: cores.borda,
    borderRadius: 8, padding: 12, fontSize: 15, backgroundColor: '#fff', color: cores.preto,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 10, padding: 16,
    marginBottom: 12, borderLeftWidth: 4, borderLeftColor: cores.laranja,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardTitulo: { fontSize: 17, fontWeight: 'bold', color: cores.preto },
  cardDesc: { fontSize: 13, color: cores.cinza, marginTop: 4 },
  vazio: { textAlign: 'center', color: cores.cinza, marginTop: 40 },
})
