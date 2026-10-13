import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && !authStore.user) {
    return { name: 'login' }
  }
  if (to.name === 'login' && authStore.user) {
    return { name: 'home' }
  }
})

export default router
