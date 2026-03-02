<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

import 'primeicons/primeicons.css'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAccessToken()
})
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
