import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as documentsApi from '@/services/documents'
import { ApiError } from '@/services/http'
import type { AnalysisResult } from '@/types/document'

export interface ChatMessage {
  question: string
  answer: string
}

type Status = 'idle' | 'uploading' | 'ready' | 'error'

export const useDocumentsStore = defineStore('documents', () => {
  const analysis = ref<AnalysisResult | null>(null)
  const status = ref<Status>('idle')
  const error = ref<string | null>(null)

  const messages = ref<ChatMessage[]>([])
  const asking = ref(false)
  const askError = ref<string | null>(null)

  async function upload(file: File) {
    status.value = 'uploading'
    error.value = null
    messages.value = []

    try {
      analysis.value = await documentsApi.uploadDocument(file)
      status.value = 'ready'
    } catch (e) {
      error.value = e instanceof ApiError ? e.message : 'Errore imprevisto durante il caricamento.'
      status.value = 'error'
    }
  }

  async function ask(question: string) {
    if (!analysis.value) return

    asking.value = true
    askError.value = null

    try {
      const { answer } = await documentsApi.askQuestion(analysis.value.doc_id, question)
      messages.value.push({ question, answer })
    } catch (e) {
      askError.value = e instanceof ApiError ? e.message : 'Errore imprevisto durante la domanda.'
    } finally {
      asking.value = false
    }
  }

  function reset() {
    analysis.value = null
    status.value = 'idle'
    error.value = null
    messages.value = []
    askError.value = null
  }

  return { analysis, status, error, messages, asking, askError, upload, ask, reset }
})
