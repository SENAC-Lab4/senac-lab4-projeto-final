import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { getCategoria, CategoriaComSecoes, getArtigos, Artigo } from '../../lib/api'
import { cores } from '../../theme'

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: RouteProp<any>
}

export default function CategoriaScreen({ navigation, route }: Props) {
  const { slug } = route.params as { slug: string }
  const [categoria, setCategoria] = useState<CategoriaComSecoes | null>(null)
  const [artigos, setArtigos] = useState<Artigo[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const [cat, lista] = await Promise.all([getCategoria(slug), getArtigos(1, 100)])
      setCategoria(cat)
      setArtigos(lista.items)
      setCarregando(false)
    }
    carregar()
  }, [slug])

  if (carregando) {
    return <View style={estilos.centro}><ActivityIndicator size="large" color={cores.laranja} /></View>
  }

  if (!categoria) return null

  return (
    <View style={estilos.container}>
      {categoria.descricao ? (
        <Text style={estilos.descricao}>{categoria.descricao}</Text>
      ) : null}

      <FlatList
        data={categoria.secoes}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item: secao }) => {
          const artigosDaSecao = artigos.filter(a => a.secao_id === secao.id)
          return (
            <View style={estilos.secao}>
              <Text style={estilos.secaoTitulo}>{secao.nome}</Text>
              {artigosDaSecao.map(artigo => (
                <TouchableOpacity
                  key={artigo.id}
                  style={estilos.artigoItem}
                  onPress={() => navigation.navigate('Artigo', { slug: artigo.slug, titulo: artigo.titulo })}
                >
                  <Text style={estilos.artigoTitulo}>{artigo.titulo}</Text>
                </TouchableOpacity>
              ))}
              {artigosDaSecao.length === 0 && (
                <Text style={estilos.vazio}>Nenhum artigo nesta seção.</Text>
              )}
            </View>
          )
        }}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Esta categoria não tem seções ainda.</Text>
        }
      />
    </View>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  descricao: { fontSize: 14, color: cores.cinza, padding: 16, paddingBottom: 0 },
  secao: { marginBottom: 20 },
  secaoTitulo: {
    fontSize: 13, fontWeight: 'bold', color: cores.laranja,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  artigoItem: {
    backgroundColor: '#fff', borderRadius: 8, padding: 14,
    marginBottom: 6, borderWidth: 1, borderColor: cores.borda,
  },
  artigoTitulo: { fontSize: 15, color: cores.preto },
  vazio: { color: cores.cinza, fontSize: 13, marginTop: 4 },
})
