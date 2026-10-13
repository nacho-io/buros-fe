<script setup lang="ts">
    import { ref } from 'vue'
    const prova = ref(0);

    function incrementa() {
        prova.value++;
    }
</script>

<template>
    <button @click="incrementa">
        Bottone di prova
    </button>
</template>