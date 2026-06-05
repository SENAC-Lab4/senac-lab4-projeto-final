import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextData {
  session: Session | null
  loading: boolean
  funcao: 'estudante' | 'professor' | 'admin' | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [funcao, setFuncao] = useState<AuthContextData['funcao']>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) carregarFuncao(data.session.access_token)
      else setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (s) carregarFuncao(s.access_token)
      else { setFuncao(null); setLoading(false) }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function carregarFuncao(token: string) {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000'
      const res = await fetch(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const perfil = await res.json()
        setFuncao(perfil.funcao)
      }
    } catch {
      // silencia erros de rede na inicialização
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, loading, funcao, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
