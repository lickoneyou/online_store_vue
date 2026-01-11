<script setup lang="ts">
import { Button } from 'primevue'
import { useRouter } from 'vue-router'
import { useCardStore } from '@/stores/card'
import SearchInput from './SearchInput.vue'

const store = useCardStore()

const router = useRouter()
</script>

<template>
  <header>
    <div class="logo_container">
      <i class="pi pi-shop" />
      <h1 @click="router.push('/')">Online store</h1>
    </div>
    <SearchInput />
    <div class="card_count_wrapper">
      <p class="card_count">{{ store.products.length }}</p>
      <Button @click="router.push('/card')" label="Go to card" severity="secondary" />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo_container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card_count_wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

h1 {
  cursor: pointer;
}
</style>
