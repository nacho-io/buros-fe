<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { useDocumentsStore } from '@/stores/documents'

const store = useDocumentsStore()
const question = ref('')

async function submit() {
  const q = question.value.trim()
  if (!q) return
  question.value = ''
  await store.ask(q)
}
</script>

<template>
  <section class="rounded-xl border border-surface-200 p-4 sm:p-6">
    <h2 class="text-lg font-semibold sm:text-xl">Fai una domanda sul documento</h2>

    <ul v-if="store.messages.length" class="mt-4 flex flex-col gap-4">
      <li v-for="(m, i) in store.messages" :key="i" class="flex flex-col gap-1">
        <p class="font-medium text-surface-900">{{ m.question }}</p>
        <p class="text-surface-700">{{ m.answer }}</p>
      </li>
    </ul>

    <form class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="submit">
      <Textarea
        v-model="question"
        rows="1"
        autoResize
        class="flex-1"
        placeholder="Es. Entro quando devo pagare?"
      />
      <Button
        type="submit"
        label="Chiedi"
        :loading="store.asking"
        :disabled="!question.trim()"
        class="w-full sm:w-auto"
      />
    </form>

    <p v-if="store.askError" class="mt-2 text-sm text-red-600">{{ store.askError }}</p>
  </section>
</template>
