import { apiFetch } from './http'
import type { AnalysisResult } from '@/types/document'

export function uploadDocument(file: File): Promise<AnalysisResult> {
  const formData = new FormData()
  formData.append('file', file)

  return apiFetch<AnalysisResult>('/api/documents/upload', {
    method: 'POST',
    body: formData,
  })
}

export function getAnalysis(docId: string): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(`/api/documents/${docId}`)
}

export function askQuestion(docId: string, question: string): Promise<{ answer: string }> {
  return apiFetch<{ answer: string }>(`/api/documents/${docId}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })
}
