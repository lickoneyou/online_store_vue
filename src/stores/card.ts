import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useCardStore = defineStore('card', () => {
  const products = ref<number[]>([])

  const addProduct = function (id: number): void {
    products.value.push(id)
  }

  const removeProduct = function (id: number): void {
    products.value = products.value.filter((productId) => productId !== id)
  }

  const removeAllProducts = function (): void {
    products.value = []
  }

  onMounted(() => {
    const localStorageItems: string | null = localStorage.getItem('products')
    if (localStorageItems) {
      products.value = JSON.parse(localStorageItems)
    }
  })

  watch(products, (newValue) => {
    localStorage.setItem('products', JSON.stringify(newValue))
  }, { deep: true })

  return { addProduct, removeProduct, removeAllProducts, products }
})
