import React, { useState } from 'react'
import {
  View, Text, TextInput, ScrollView,
  StyleSheet, TouchableOpacity,
} from 'react-native'
import { cores } from '../../theme'

interface Bimestre {
  av1: string
  av2: string
}

function calcularMedia(b: Bimestre): number | null {
  const av1 = parseFloat(b.av1.replace(',', '.'))
  const av2 = parseFloat(b.av2.replace(',', '.'))
  if (isNaN(av1) || isNaN(av2)) return null
  return (av1 + av2) / 2
}

function notaParaRecuperacao(media: number): number | null {
  // Para passar direto: média >= 6
  // Recuperação: nota necessária para média final >= 5
  // Fórmula FACSENAC: (media + rec) / 2 >= 5 → rec >= 10 - media
  if (media >= 6) return null
  const rec = 10 - media
  return Math.min(10, Math.max(0, rec))
}

export default function CalculadoraScreen() {
  const [b1, setB1] = useState<Bimestre>({ av1: '', av2: '' })
  const [b2, setB2] = useState<Bimestre>({ av1: '', av2: '' })

  const mediaB1 = calcularMedia(b1)
  const mediaB2 = calcularMedia(b2)
  const mediaFinal = mediaB1 !== null && mediaB2 !== null ? (mediaB1 + mediaB2) / 2 : null
  const recNecessaria = mediaFinal !== null ? notaParaRecuperacao(mediaFinal) : null

  function limpar() {
    setB1({ av1: '', av2: '' })
    setB2({ av1: '', av2: '' })
  }

  function corDaMedia(media: number | null) {
    if (media === null) return cores.cinza
    if (media >= 6) return cores.sucesso
    if (media >= 5) return cores.alerta
    return cores.erro
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.titulo}>Calculadora de Médias</Text>
      <Text style={estilos.subtitulo}>Insira suas notas para calcular a média e verificar se precisa de recuperação.</Text>

      {/* 1º Bimestre */}
      <View style={estilos.card}>
        <Text style={estilos.cardTitulo}>1º Bimestre</Text>
        <View style={estilos.linha}>
          <View style={estilos.campo}>
            <Text style={estilos.label}>AV1</Text>
            <TextInput
              style={estilos.input}
              placeholder="0,0"
              placeholderTextColor={cores.cinza}
              value={b1.av1}
              onChangeText={v => setB1(p => ({ ...p, av1: v }))}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={estilos.campo}>
            <Text style={estilos.label}>AV2</Text>
            <TextInput
              style={estilos.input}
              placeholder="0,0"
              placeholderTextColor={cores.cinza}
              value={b1.av2}
              onChangeText={v => setB1(p => ({ ...p, av2: v }))}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={estilos.campo}>
            <Text style={estilos.label}>Média</Text>
            <Text style={[estilos.resultado, { color: corDaMedia(mediaB1) }]}>
              {mediaB1 !== null ? mediaB1.toFixed(1) : '—'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2º Bimestre */}
      <View style={estilos.card}>
        <Text style={estilos.cardTitulo}>2º Bimestre</Text>
        <View style={estilos.linha}>
          <View style={estilos.campo}>
            <Text style={estilos.label}>AV1</Text>
            <TextInput
              style={estilos.input}
              placeholder="0,0"
              placeholderTextColor={cores.cinza}
              value={b2.av1}
              onChangeText={v => setB2(p => ({ ...p, av1: v }))}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={estilos.campo}>
            <Text style={estilos.label}>AV2</Text>
            <TextInput
              style={estilos.input}
              placeholder="0,0"
              placeholderTextColor={cores.cinza}
              value={b2.av2}
              onChangeText={v => setB2(p => ({ ...p, av2: v }))}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={estilos.campo}>
            <Text style={estilos.label}>Média</Text>
            <Text style={[estilos.resultado, { color: corDaMedia(mediaB2) }]}>
              {mediaB2 !== null ? mediaB2.toFixed(1) : '—'}
            </Text>
          </View>
        </View>
      </View>

      {/* Resultado final */}
      {mediaFinal !== null && (
        <View style={[estilos.card, estilos.cardFinal]}>
          <Text style={estilos.cardTitulo}>Resultado Final</Text>
          <Text style={[estilos.mediaFinal, { color: corDaMedia(mediaFinal) }]}>
            {mediaFinal.toFixed(2)}
          </Text>
          {recNecessaria === null ? (
            <Text style={estilos.aprovado}>Aprovado direto!</Text>
          ) : (
            <View>
              <Text style={estilos.reprovado}>Em recuperação</Text>
              <Text style={estilos.recTexto}>
                Nota necessária na recuperação: <Text style={{ fontWeight: 'bold' }}>{recNecessaria.toFixed(1)}</Text>
              </Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity style={estilos.botaoLimpar} onPress={limpar}>
        <Text style={estilos.botaoTexto}>Limpar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: cores.azul, marginBottom: 6 },
  subtitulo: { fontSize: 13, color: cores.cinza, marginBottom: 20, lineHeight: 18 },
  card: {
    backgroundColor: cores.superficie, borderRadius: 12, padding: 16,
    marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4,
  },
  cardFinal: { borderWidth: 2, borderColor: cores.laranja },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: cores.preto, marginBottom: 12 },
  linha: { flexDirection: 'row', gap: 12 },
  campo: { flex: 1 },
  label: { fontSize: 12, color: cores.cinza, marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 6,
    padding: 10, fontSize: 16, color: cores.preto, textAlign: 'center',
  },
  resultado: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 8 },
  mediaFinal: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
  aprovado: { color: cores.sucesso, textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  reprovado: { color: cores.erro, textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  recTexto: { color: cores.preto, textAlign: 'center', marginTop: 8, fontSize: 15 },
  botaoLimpar: {
    borderWidth: 1, borderColor: cores.laranja, borderRadius: 8,
    padding: 14, alignItems: 'center', marginTop: 4,
  },
  botaoTexto: { color: cores.laranja, fontWeight: 'bold', fontSize: 15 },
})
