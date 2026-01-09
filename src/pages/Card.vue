<script setup lang="ts">
import ClearCardModal from '@/components/ClearCardModal.vue'
import ProductsList from '@/components/ProductsList.vue'
import { useCardStore } from '@/stores/card'
import { useProductsStore } from '@/stores/products'
import { Button } from 'primevue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const cardStore = useCardStore()
const productsStore = useProductsStore()
const router = useRouter()

const isShow = ref(false)

const cardItems = computed(() => {
  return productsStore.products.filter((product) => cardStore.products.includes(product.id))
})

const showModal = function (): void {
  isShow.value = !isShow.value
}

const handleClearModal = function (isClear: boolean): void {
  if (isClear) {
    cardStore.removeAllProducts()
  }

  showModal()
}
</script>

<template>
  <div v-if="cardItems.length">
    <div class="card_header">
      <Button @click="showModal" label="Clear card" severity="danger" />
    </div>
    <ProductsList :products="cardItems" />
  </div>
  <div v-else class="empty">
    <p>Card is empty!</p>
    <Button @click="router.push('/')" label="Go Home" />
  </div>
  <ClearCardModal :isShow @clear-modal="handleClearModal" />
</template>

<style lang="scss" scoped>
.card_header {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0;
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
