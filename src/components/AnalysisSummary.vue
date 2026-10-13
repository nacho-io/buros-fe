<script setup lang="ts">
import Tag from 'primevue/tag'
import type { AnalysisResult } from '@/types/document'

defineProps<{ analysis: AnalysisResult }>()

const TIPO_LABELS: Record<string, string> = {
  bolletta: 'Bolletta',
  contratto: 'Contratto',
  multa: 'Multa',
  pec: 'PEC',
  altro: 'Altro',
}
</script>

<template>
  <section class="rounded-xl border border-surface-200 p-4 sm:p-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-lg font-semibold sm:text-xl">Riepilogo</h2>
      <Tag :value="TIPO_LABELS[analysis.tipo] ?? analysis.tipo" />
    </div>

    <p class="mt-3 text-surface-700">{{ analysis.extracted.riepilogo }}</p>

    <dl class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-if="analysis.extracted.mittente">
        <dt class="text-sm text-surface-500">Mittente</dt>
        <dd class="font-medium">{{ analysis.extracted.mittente }}</dd>
      </div>
      <div v-if="analysis.extracted.destinatario">
        <dt class="text-sm text-surface-500">Destinatario</dt>
        <dd class="font-medium">{{ analysis.extracted.destinatario }}</dd>
      </div>
      <div v-if="analysis.extracted.importo">
        <dt class="text-sm text-surface-500">Importo</dt>
        <dd class="font-medium">{{ analysis.extracted.importo }}</dd>
      </div>
      <div v-if="analysis.extracted.scadenza">
        <dt class="text-sm text-surface-500">Scadenza</dt>
        <dd class="font-medium">{{ analysis.extracted.scadenza }}</dd>
      </div>
      <div v-if="analysis.extracted.azione_richiesta" class="sm:col-span-2">
        <dt class="text-sm text-surface-500">Azione richiesta</dt>
        <dd class="font-medium">{{ analysis.extracted.azione_richiesta }}</dd>
      </div>
      <div v-if="analysis.extracted.riferimenti_normativi.length" class="sm:col-span-2">
        <dt class="text-sm text-surface-500">Riferimenti normativi</dt>
        <dd class="mt-1 flex flex-wrap gap-2">
          <Tag
            v-for="ref in analysis.extracted.riferimenti_normativi"
            :key="ref"
            :value="ref"
            severity="secondary"
          />
        </dd>
      </div>
    </dl>
  </section>
</template>
