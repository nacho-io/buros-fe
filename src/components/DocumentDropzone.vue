<script setup lang="ts">
import { ref } from 'vue'

const SUPPORTED_EXT = ['.pdf', '.txt', '.docx', '.jpg', '.jpeg', '.png', '.webp']

const emit = defineEmits<{ select: [file: File] }>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const localError = ref<string | null>(null)

function validate(file: File): boolean {
  const ext = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`
  if (!SUPPORTED_EXT.includes(ext)) {
    localError.value = `Formato non supportato: ${ext}. Formati ammessi: ${SUPPORTED_EXT.join(', ')}`
    return false
  }
  localError.value = null
  return true
}

function handleFiles(files: FileList | null) {
  const file = files?.[0]
  if (!file) return
  if (validate(file)) emit('select', file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  handleFiles(e.dataTransfer?.files ?? null)
}

function onInputChange(e: Event) {
  handleFiles((e.target as HTMLInputElement).files)
  ;(e.target as HTMLInputElement).value = ''
}

function openPicker() {
  fileInput.value?.click()
}
</script>

<template>
  <div>
    <div
      class="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors sm:p-10"
      :class="isDragging ? 'border-primary-500 bg-primary-50' : 'border-surface-300 hover:border-surface-400'"
      role="button"
      tabindex="0"
      @click="openPicker"
      @keydown.enter="openPicker"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <i class="pi pi-cloud-upload text-4xl text-surface-400"></i>
      <p class="font-medium text-surface-700">Trascina qui un documento o clicca per selezionarlo</p>
      <p class="text-sm text-surface-500">PDF, TXT, DOCX, JPG, PNG, WEBP</p>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="SUPPORTED_EXT.join(',')"
        @change="onInputChange"
      />
    </div>
    <p v-if="localError" class="mt-2 text-sm text-red-600">{{ localError }}</p>
  </div>
</template>
