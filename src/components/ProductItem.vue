<script setup lang="ts">
import type { Product } from '@/types/Product'
import AddCardButton from './AddCardButton.vue'
import Button from './Button.vue'

const props = defineProps<Product>()
</script>

<template>
  <div class="product_item">
    <div class="title_container">
      <img :src="props.image" :alt="props.title" />
      <div class="title_wrapper">
        <div class="title">
          <p class="category">{{ props.category }}</p>
          <h2>{{ props.title }}</h2>
        </div>
        <div class="rate">
          <p>{{ props.rating.rate }}</p>
          <i class="pi pi-star-fill text-yellow-500"></i>
        </div>
      </div>
    </div>
    <div class="card_container">
      <p class="price">{{ props.price }} $</p>
      <div class="action_buttons">
        <AddCardButton :id="props.id" />
        <Button label="Buy now" :route="`product/${props.id}`" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product_item {
  display: flex;
  justify-content: space-between;
  height: 300px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px 10px;

  .title_container {
    display: flex;
    gap: 15px;

    img {
      height: 100%;
      width: auto;
    }

    .title_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title,
      .rate {
        color: #000000;
      }

      .rate {
        display: flex;
        align-items: center;
        gap: 5px;

        i {
          color: rgb(228, 158, 7);
        }
      }
    }
  }

  .card_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000000;

    .action_buttons {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }
}
</style>
