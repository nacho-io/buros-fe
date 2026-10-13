import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const user = ref<User | null>(null)
  const ready = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function init() {
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user ?? null
    ready.value = true

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })
  }

  async function signIn(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    if (err) {
      error.value = err.message
      return false
    }
    return true
  }

  async function signUp(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    const { error: err } = await supabase.auth.signUp({ email, password })
    loading.value = false
    if (err) {
      error.value = err.message
      return false
    }
    return true
  }

  async function signInWithGoogle(): Promise<boolean> {
    error.value = null
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (err) {
      error.value = err.message
      return false
    }
    // Il browser viene reindirizzato a Google: non c'è altro da fare qui,
    // la sessione verrà rilevata da init() al ritorno sul nostro dominio.
    return true
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { session, user, ready, loading, error, init, signIn, signUp, signInWithGoogle, signOut }
})
