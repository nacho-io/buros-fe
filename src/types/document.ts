export type DocumentType = 'bolletta' | 'contratto' | 'multa' | 'pec' | 'altro'

export interface ExtractedInfo {
  mittente: string | null
  destinatario: string | null
  importo: string | null
  scadenza: string | null
  azione_richiesta: string | null
  riferimenti_normativi: string[]
  riepilogo: string
}

export interface RedFlag {
  descrizione: string
  gravita: string
}

export interface AnalysisResult {
  doc_id: string
  tipo: DocumentType
  extracted: ExtractedInfo
  red_flags: RedFlag[]
  spiegazione_semplice: string
  checklist: string[]
  disclaimer: string
}
