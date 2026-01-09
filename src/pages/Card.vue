<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'
import { useCardStore } from '@/stores/card'
import { useProductsStore } from '@/stores/products'
import { Button } from 'primevue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const cardStore = useCardStore()
const productsStore = useProductsStore()
const router = useRouter()

const cardItems = computed(() => {
  return productsStore.products.filter((product) => cardStore.products.includes(product.id))
})
</script>

<template>
  <ProductsList v-if="cardItems.length" :products="cardItems" />
  <div v-else class="empty">
    <p>Card is empty!</p>
    <Button @click="router.push('/')" label="Go Home" />
  </div>
</template>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
