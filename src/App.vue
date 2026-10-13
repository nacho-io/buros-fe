<script setup lang="ts">
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header
    v-if="authStore.user"
    class="flex items-center justify-between gap-3 border-b border-surface-200 px-4 py-3"
  >
    <span class="truncate text-sm text-surface-600">{{ authStore.user.email }}</span>
    <Button
      label="Esci"
      severity="secondary"
      text
      size="small"
      class="shrink-0"
      @click="authStore.signOut()"
    />
  </header>
  <RouterView />
</template>

<style scoped></style>
