import Constants from 'expo-constants'

const API_PORT = 8000

// Resolve a URL do backend nesta ordem:
// 1. EXPO_PUBLIC_API_URL, se definida no .env (deploy/nuvem ou IP fixo).
// 2. IP da máquina que está servindo o app (Metro/Expo) — detectado em runtime,
//    de modo que cada pessoa que clonar e rodar `npm start` alcance o backend
//    local dela sem editar nada, mesmo que o IP da rede mude.
// 3. localhost, como último recurso (emulador/web na própria máquina).
function resolverApiUrl(): string {
  const doEnv = process.env.EXPO_PUBLIC_API_URL
  if (doEnv) return doEnv

  const hostUri = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost
  const host = hostUri?.split(':')[0]
  if (host) return `http://${host}:${API_PORT}`

  return `http://localhost:${API_PORT}`
}

const API_URL = resolverApiUrl()

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    })
    if (!res.ok) {
      const erro = await res.json().catch(() => ({}))
      throw new Error(erro.detail ?? `Erro ${res.status}`)
    }
    return res.json()
  } finally {
    clearTimeout(timeout)
  }
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

// ---------- Auth ----------

export function getPerfil(token: string) {
  return request<Perfil>('/auth/me', { headers: authHeaders(token) })
}

// ---------- Categorias ----------

export function getCategorias(token?: string) {
  return request<Categoria[]>('/categorias', {
    headers: token ? authHeaders(token) : {},
  })
}

export function getCategoria(slug: string) {
  return request<CategoriaComSecoes>(`/categorias/${slug}`)
}

// ---------- Seções ----------

export function getSecoes(categoriaId?: number) {
  const query = categoriaId ? `?categoria_id=${categoriaId}` : ''
  return request<Secao[]>(`/secoes${query}`)
}

// ---------- Artigos ----------

export function getArtigos(page = 1, pageSize = 20) {
  return request<ArtigoList>(`/artigos?page=${page}&page_size=${pageSize}`)
}

export function getArtigo(slug: string) {
  return request<Artigo>(`/artigos/${slug}`)
}

// ---------- Admin ----------

export function getArtigosAdmin(token: string, params: AdminArtigosParams = {}) {
  const query = new URLSearchParams()
  if (params.status) query.set('status', params.status)
  if (params.secao_id) query.set('secao_id', String(params.secao_id))
  if (params.page) query.set('page', String(params.page))
  const qs = query.toString() ? `?${query}` : ''
  return request<ArtigoList>(`/admin/artigos${qs}`, { headers: authHeaders(token) })
}

export function criarArtigo(token: string, dados: ArtigoCreate) {
  return request<Artigo>('/artigos', {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: authHeaders(token),
  })
}

export function atualizarArtigo(token: string, id: number, dados: Partial<ArtigoCreate>) {
  return request<Artigo>(`/artigos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dados),
    headers: authHeaders(token),
  })
}

export function excluirArtigo(token: string, id: number) {
  return request<void>(`/artigos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}

// ---------- Tipos ----------

export interface Perfil {
  id: string
  email: string | null
  nome_inteiro: string | null
  funcao: 'estudante' | 'professor' | 'admin'
}

export interface Categoria {
  id: number
  nome: string
  slug: string
  descricao: string | null
  posicao: number
}

export interface Secao {
  id: number
  categoria_id: number
  nome: string
  slug: string
  posicao: number
}

export interface CategoriaComSecoes extends Categoria {
  secoes: Secao[]
}

export interface Artigo {
  id: number
  titulo: string
  slug: string
  conteudo: string
  status: 'rascunho' | 'publicado' | 'escondido' | 'agendado'
  secao_id: number | null
  publicado_em: string | null
  criado_em: string
  atualizado_em: string
}

export interface ArtigoList {
  items: Artigo[]
  total: number
  page: number
  page_size: number
}

export interface ArtigoCreate {
  titulo: string
  conteudo: string
  secao_id?: number
  status?: Artigo['status']
  agendado_para?: string
}

export interface AdminArtigosParams {
  status?: string
  secao_id?: number
  page?: number
}
