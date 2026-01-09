<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { useProductsStore } from '@/stores/products'
import AddCardButton from '@/components/AddCardButton.vue'
import Button from '@/components/Button.vue'

const route = useRoute()
const store = useProductsStore()

const productItem = computed(() => {
  const id = route.params.id

  return store.products.find((product) => product.id === Number(id))
})
</script>

<template>
  <div class="product" v-if="productItem">
    <img :src="productItem.image" :alt="productItem.title" />
    <div class="product_wrapper">
      <div class="description">
        <h2>{{ productItem.title }}</h2>
        <p>{{ productItem.description }}</p>
      </div>
      <div class="product_footer">
        <p class="price">{{ productItem.price }}</p>
        <div class="action_button">
          <AddCardButton :id="productItem.id" />
          <Button label="Go to card" route="/card" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Product is not find!</p>
  </div>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  gap: 50px;
  padding-bottom: 50px;

  .product_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .product_footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .action_button {
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }
  }
}
</style>
