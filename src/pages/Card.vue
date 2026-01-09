<script setup lang="ts">
  import ProductsList from '@/components/ProductsList.vue';
import { useCardStore } from '@/stores/card';
import { useProductsStore } from '@/stores/products';
import { computed } from 'vue';

  const cardStore = useCardStore();
  const productsStore = useProductsStore();

  const cardItems = computed(() => {
    return productsStore.products.filter((product) => cardStore.products.includes(product.id))
  })
</script>

<template>
  <ProductsList :products="cardItems"/>
</template>
