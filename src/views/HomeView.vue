<script setup lang="ts">
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import DocumentDropzone from '@/components/DocumentDropzone.vue'
import AnalysisSummary from '@/components/AnalysisSummary.vue'
import RedFlagsPanel from '@/components/RedFlagsPanel.vue'
import ChecklistPanel from '@/components/ChecklistPanel.vue'
import AskPanel from '@/components/AskPanel.vue'
import { useDocumentsStore } from '@/stores/documents'

const store = useDocumentsStore()

function onSelect(file: File) {
  store.upload(file)
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
    <h1 class="text-2xl font-bold sm:text-3xl">Assistente Documenti Burocratici</h1>
    <p class="mt-2 text-sm text-surface-600 sm:text-base">
      Carica una bolletta, un contratto, una multa o una PEC: ricevi un riepilogo, i punti di
      attenzione e una checklist di cosa fare.
    </p>

    <div class="mt-6 sm:mt-8">
      <DocumentDropzone v-if="store.status !== 'ready'" @select="onSelect" />

      <div v-if="store.status === 'uploading'" class="mt-6 flex items-center gap-3 text-surface-600">
        <ProgressSpinner style="width: 24px; height: 24px" stroke-width="6" />
        Analisi del documento in corso...
      </div>

      <p v-if="store.status === 'error'" class="mt-4 text-red-600">{{ store.error }}</p>
    </div>

    <div v-if="store.analysis" class="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-6">
      <AnalysisSummary :analysis="store.analysis" />
      <RedFlagsPanel :red-flags="store.analysis.red_flags" />
      <ChecklistPanel :checklist="store.analysis.checklist" />
      <AskPanel />

      <p class="text-xs text-surface-400">{{ store.analysis.disclaimer }}</p>

      <Button
        label="Carica un altro documento"
        severity="secondary"
        outlined
        class="w-full sm:w-auto"
        @click="store.reset"
      />
    </div>
  </main>
</template>
