<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'

import { useProductsStore } from '@/stores/products';

const store = useProductsStore()
</script>

<template>
  <ProductsList :products="store.products"/>
</template>
