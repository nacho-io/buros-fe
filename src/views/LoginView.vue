<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const mode = ref<'signin' | 'signup'>('signin')
const info = ref<string | null>(null)

async function submit() {
  info.value = null
  if (mode.value === 'signin') {
    const ok = await authStore.signIn(email.value, password.value)
    if (ok) router.push({ name: 'home' })
  } else {
    const ok = await authStore.signUp(email.value, password.value)
    if (ok) info.value = 'Controlla la tua email per confermare la registrazione.'
  }
}

function toggleMode() {
  mode.value = mode.value === 'signin' ? 'signup' : 'signin'
  authStore.error = null
  info.value = null
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-8 sm:px-6">
    <h1 class="text-2xl font-bold">{{ mode === 'signin' ? 'Accedi' : 'Registrati' }}</h1>

    <form class="mt-6 flex flex-col gap-4" @submit.prevent="submit">
      <div class="flex flex-col gap-1">
        <label for="email" class="text-sm text-surface-600">Email</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="w-full"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="password" class="text-sm text-surface-600">Password</label>
        <Password
          id="password"
          v-model="password"
          :feedback="mode === 'signup'"
          toggle-mask
          input-class="w-full"
          class="w-full"
          :autocomplete="mode === 'signin' ? 'current-password' : 'new-password'"
        />
      </div>

      <Button
        type="submit"
        :label="mode === 'signin' ? 'Accedi' : 'Registrati'"
        :loading="authStore.loading"
        class="w-full"
      />
    </form>

    <p v-if="authStore.error" class="mt-3 text-sm text-red-600">{{ authStore.error }}</p>
    <p v-if="info" class="mt-3 text-sm text-emerald-600">{{ info }}</p>

    <div class="mt-6 flex items-center gap-3 text-xs text-surface-400">
      <div class="h-px flex-1 bg-surface-200"></div>
      oppure
      <div class="h-px flex-1 bg-surface-200"></div>
    </div>

    <Button
      type="button"
      label="Accedi con Google"
      icon="pi pi-google"
      severity="secondary"
      outlined
      class="mt-4 w-full"
      @click="authStore.signInWithGoogle()"
    />

    <button type="button" class="mt-6 text-sm text-primary-600 underline" @click="toggleMode">
      {{ mode === 'signin' ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi' }}
    </button>
  </main>
</template>
