import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/pages/Main.vue'
import Card from '@/pages/Card.vue'
import Product from '@/pages/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    { path: '/card', component: Card },
    { path: '/product/:id', component: Product },
  ],
})

export default router
