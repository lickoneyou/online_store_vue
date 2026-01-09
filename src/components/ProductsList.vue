<script setup lang="ts">
import type { Product } from '@/types/Product'
import ProductItem from './ProductItem.vue'

const props = defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="products_wrapper">
    <ProductItem v-for="product in props.products" :key="product.id" v-bind="product" />
  </div>
</template>

<style lang="scss" scoped>
.products_wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
