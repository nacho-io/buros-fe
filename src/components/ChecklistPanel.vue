<script setup lang="ts">
defineProps<{ checklist: string[] }>()
</script>

<template>
  <section class="rounded-xl border border-surface-200 p-4 sm:p-6">
    <h2 class="text-lg font-semibold sm:text-xl">Cosa fare</h2>
    <ol class="mt-4 flex list-inside list-decimal flex-col gap-2 text-surface-700">
      <li v-for="(item, i) in checklist" :key="i">{{ item }}</li>
    </ol>
  </section>
</template>
