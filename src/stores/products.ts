import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from '@/types/Product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])

  const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()

    products.value = [...data]
  }

  onMounted(() => {
    getProducts()
  })

  return { products }
})
