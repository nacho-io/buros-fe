<script setup lang="ts">
import Tag from 'primevue/tag'
import type { RedFlag } from '@/types/document'

defineProps<{ redFlags: RedFlag[] }>()

const SEVERITY_MAP: Record<string, 'success' | 'warn' | 'danger' | 'secondary'> = {
  bassa: 'success',
  media: 'warn',
  alta: 'danger',
}
</script>

<template>
  <section class="rounded-xl border border-surface-200 p-4 sm:p-6">
    <h2 class="text-lg font-semibold sm:text-xl">Punti di attenzione</h2>

    <p v-if="!redFlags.length" class="mt-3 text-surface-500">Nessun elemento critico rilevato.</p>

    <ul v-else class="mt-4 flex flex-col gap-3">
      <li v-for="(flag, i) in redFlags" :key="i" class="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
        <Tag class="self-start" :value="flag.gravita" :severity="SEVERITY_MAP[flag.gravita] ?? 'secondary'" />
        <span class="text-surface-700">{{ flag.descrizione }}</span>
      </li>
    </ul>
  </section>
</template>
