import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      // Tailwind CSS deve avere sempre la precedenza su PrimeVue per
      // evitare conflitti (in particolare sulle utility responsive).
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
      darkModeSelector: '.dark',
    },
  },
});

// Risolviamo la sessione Supabase prima di montare il router, altrimenti la
// prima navigazione potrebbe rimbalzare su /login anche se l'utente è già loggato.
await useAuthStore().init()

app.use(router)

app.mount('#app')
