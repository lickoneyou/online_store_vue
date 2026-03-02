import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/pages/Main.vue') },
    { path: '/card', component: () => import('@/pages/Card.vue') },
    { path: '/product/:id', component: () => import('@/pages/Product.vue') },
    { path: '/profile', component: () => import('@/pages/Profile.vue'), meta: { requiresAuth: true }}
  ],
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
