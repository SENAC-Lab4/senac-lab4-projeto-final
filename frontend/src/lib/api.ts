const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const erro = await res.json().catch(() => ({}))
    throw new Error(erro.detail ?? `Erro ${res.status}`)
  }
  return res.json()
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
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
