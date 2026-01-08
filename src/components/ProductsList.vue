<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

import ProductItem from './ProductItem.vue'

const store = useProductsStore()
</script>

<template>
  <div class="products_wrapper">
    <ProductItem v-for="product in store.products" :key="product.id" v-bind="product" />
  </div>
</template>

<style lang="scss" scoped>
.products_wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
