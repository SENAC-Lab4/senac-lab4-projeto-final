import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { getArtigo, Artigo } from '../../lib/api'
import { cores } from '../../theme'

type Props = { route: RouteProp<any> }

export default function ArtigoScreen({ route }: Props) {
  const { slug } = route.params as { slug: string }
  const [artigo, setArtigo] = useState<Artigo | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getArtigo(slug)
      .then(setArtigo)
      .finally(() => setCarregando(false))
  }, [slug])

  if (carregando) {
    return <View style={estilos.centro}><ActivityIndicator size="large" color={cores.laranja} /></View>
  }

  if (!artigo) {
    return <View style={estilos.centro}><Text style={estilos.erro}>Artigo não encontrado.</Text></View>
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.titulo}>{artigo.titulo}</Text>
      {artigo.publicado_em && (
        <Text style={estilos.data}>
          Publicado em {new Date(artigo.publicado_em).toLocaleDateString('pt-BR')}
        </Text>
      )}
      <View style={estilos.divisor} />
      {/* Renderiza o conteúdo como texto simples por enquanto */}
      <Text style={estilos.corpo}>{artigo.conteudo}</Text>
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  conteudo: { padding: 20 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.preto, lineHeight: 32 },
  data: { fontSize: 12, color: cores.cinza, marginTop: 8 },
  divisor: { height: 3, backgroundColor: cores.laranja, width: 40, marginTop: 16, marginBottom: 20, borderRadius: 2 },
  corpo: { fontSize: 16, color: cores.preto, lineHeight: 26 },
  erro: { color: cores.cinza },
})
