import React, { useEffect, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, Modal, ScrollView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cores } from '../../theme'

interface Disciplina {
  id: string
  nome: string
  totalAulas: number
  faltas: number
}

const STORAGE_KEY = '@guia_presenca'

export default function PresencaScreen() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
  const [modalVisivel, setModalVisivel] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [novoTotal, setNovoTotal] = useState('')
  const [erro, setErro] = useState('')
  const [disciplinaParaExcluir, setDisciplinaParaExcluir] = useState<Disciplina | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setDisciplinas(JSON.parse(data))
    })
  }, [])

  async function salvar(lista: Disciplina[]) {
    setDisciplinas(lista)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
  }

  function adicionarFalta(id: string) {
    salvar(disciplinas.map(d =>
      d.id === id ? { ...d, faltas: Math.min(d.faltas + 1, d.totalAulas) } : d
    ))
  }

  function removerFalta(id: string) {
    salvar(disciplinas.map(d =>
      d.id === id ? { ...d, faltas: Math.max(0, d.faltas - 1) } : d
    ))
  }

  function excluirDisciplina(disciplina: Disciplina) {
    setDisciplinaParaExcluir(disciplina)
  }

  function confirmarExclusao() {
    if (!disciplinaParaExcluir) return
    salvar(disciplinas.filter(d => d.id !== disciplinaParaExcluir.id))
    setDisciplinaParaExcluir(null)
  }

  function adicionarDisciplina() {
    const total = parseInt(novoTotal)
    if (!novoNome.trim() || isNaN(total) || total <= 0) {
      setErro('Preencha nome e total de aulas corretamente')
      return
    }
    const nova: Disciplina = {
      id: Date.now().toString(),
      nome: novoNome.trim(),
      totalAulas: total,
      faltas: 0,
    }
    salvar([...disciplinas, nova])
    setNovoNome('')
    setNovoTotal('')
    setErro('')
    setModalVisivel(false)
  }

  function porcentagemFaltas(d: Disciplina): number {
    if (d.totalAulas === 0) return 0
    return (d.faltas / d.totalAulas) * 100
  }

  function corStatus(d: Disciplina) {
    const pct = porcentagemFaltas(d)
    if (pct >= 25) return cores.erro
    if (pct >= 20) return cores.alerta
    return cores.sucesso
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={disciplinas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const pct = porcentagemFaltas(item)
          const faltasRestantes = Math.floor(item.totalAulas * 0.25) - item.faltas
          return (
            <View style={estilos.card}>
              <View style={estilos.cardHeader}>
                <Text style={estilos.nome}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={() => excluirDisciplina(item)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={estilos.excluir}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={estilos.barraContainer}>
                <View style={[estilos.barra, { width: `${Math.min(pct, 100)}%`, backgroundColor: corStatus(item) }]} />
              </View>

              <View style={estilos.infoLinha}>
                <Text style={estilos.info}>{item.faltas} faltas / {item.totalAulas} aulas</Text>
                <Text style={[estilos.pct, { color: corStatus(item) }]}>{pct.toFixed(0)}%</Text>
              </View>

              {faltasRestantes > 0 ? (
                <Text style={estilos.aviso}>Pode faltar mais {faltasRestantes} aula(s)</Text>
              ) : (
                <Text style={[estilos.aviso, { color: cores.erro }]}>Limite de 25% atingido!</Text>
              )}

              <View style={estilos.botoes}>
                <TouchableOpacity style={estilos.botaoRemover} onPress={() => removerFalta(item.id)}>
                  <Text style={estilos.botaoTexto}>− Falta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botaoAdicionar} onPress={() => adicionarFalta(item.id)}>
                  <Text style={[estilos.botaoTexto, { color: cores.branco }]}>+ Falta</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
        ListEmptyComponent={
          <View style={estilos.vazio}>
            <Text style={estilos.vazioTexto}>Nenhuma disciplina cadastrada.</Text>
            <Text style={estilos.vazioSub}>Toque no botão + para adicionar.</Text>
          </View>
        }
      />

      <TouchableOpacity style={estilos.fab} onPress={() => { setErro(''); setModalVisivel(true) }} activeOpacity={0.85}>
        <LinearGradient
          colors={cores.gradiente}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={estilos.fabGradiente}
        >
          <Text style={estilos.fabTexto}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisivel} transparent animationType="slide">
        <View style={estilos.modalOverlay}>
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>Nova disciplina</Text>
            <TextInput
              style={estilos.input}
              placeholder="Nome da disciplina"
              placeholderTextColor={cores.cinza}
              value={novoNome}
              onChangeText={setNovoNome}
            />
            <TextInput
              style={estilos.input}
              placeholder="Total de aulas no semestre"
              placeholderTextColor={cores.cinza}
              value={novoTotal}
              onChangeText={setNovoTotal}
              keyboardType="number-pad"
            />
            {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
            <View style={estilos.modalBotoes}>
              <TouchableOpacity style={estilos.botaoRemover} onPress={() => { setModalVisivel(false); setErro('') }}>
                <Text style={estilos.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botaoAdicionar} onPress={adicionarDisciplina}>
                <Text style={[estilos.botaoTexto, { color: cores.branco }]}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={!!disciplinaParaExcluir} transparent animationType="slide">
        <View style={estilos.modalOverlay}>
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>Remover disciplina</Text>
            <Text style={estilos.modalMensagem}>
              Tem certeza que deseja remover {disciplinaParaExcluir ? `"${disciplinaParaExcluir.nome}"` : 'esta disciplina'}?
              Os registros de presença dela serão perdidos.
            </Text>
            <View style={estilos.modalBotoes}>
              <TouchableOpacity style={estilos.botaoRemover} onPress={() => setDisciplinaParaExcluir(null)}>
                <Text style={estilos.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botaoExcluirConfirmar} onPress={confirmarExclusao}>
                <Text style={[estilos.botaoTexto, { color: cores.branco }]}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  card: {
    backgroundColor: cores.superficie, borderRadius: 12, padding: 16,
    marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.preto, flex: 1 },
  excluir: { color: cores.cinza, fontSize: 18, padding: 6, paddingLeft: 12 },
  barraContainer: { height: 6, backgroundColor: cores.borda, borderRadius: 3, marginBottom: 8 },
  barra: { height: 6, borderRadius: 3 },
  infoLinha: { flexDirection: 'row', justifyContent: 'space-between' },
  info: { fontSize: 13, color: cores.cinza },
  pct: { fontSize: 13, fontWeight: 'bold' },
  aviso: { fontSize: 12, color: cores.sucesso, marginTop: 4 },
  botoes: { flexDirection: 'row', gap: 8, marginTop: 12 },
  botaoAdicionar: { flex: 1, backgroundColor: cores.laranja, borderRadius: 8, padding: 10, alignItems: 'center' },
  botaoRemover: { flex: 1, borderWidth: 1, borderColor: cores.borda, borderRadius: 8, padding: 10, alignItems: 'center' },
  botaoTexto: { fontWeight: 'bold', fontSize: 14, color: cores.preto },
  vazio: { alignItems: 'center', marginTop: 60 },
  vazioTexto: { fontSize: 16, color: cores.cinza },
  vazioSub: { fontSize: 13, color: cores.cinza, marginTop: 6 },
  fab: { position: 'absolute', right: 20, bottom: 20 },
  fabGradiente: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
  },
  fabTexto: { color: cores.branco, fontSize: 28, lineHeight: 32 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { backgroundColor: cores.superficie, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', color: cores.preto, marginBottom: 16 },
  modalMensagem: { fontSize: 14, color: cores.cinza, lineHeight: 20, marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 8,
    padding: 12, fontSize: 15, color: cores.preto, marginBottom: 12,
  },
  erro: { color: cores.erro, fontSize: 13, marginBottom: 12 },
  modalBotoes: { flexDirection: 'row', gap: 10, marginTop: 4 },
  botaoExcluirConfirmar: { flex: 1, backgroundColor: cores.erro, borderRadius: 8, padding: 10, alignItems: 'center' },
})
