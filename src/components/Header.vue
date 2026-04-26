<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

import { useCardStore } from '@/stores/card'
import SearchInput from './SearchInput.vue'
import AuthModal from './modals/AuthModal.vue'
import { useAuthStore } from '@/stores/auth'

const store = useCardStore()
const authStore = useAuthStore()

const router = useRouter()

const isShow = ref({
  register: false,
  login: false
})

watch(() => authStore.isLogin, (newValue) => {
  if (newValue) {
    closeAllModals();
  }
});

function toggleShowModal(modalType: 'register' | 'login') {
  if (!isShow.value[modalType]) {
    closeAllModals();
  }
  isShow.value[modalType] = !isShow.value[modalType];
}

function closeAllModals() {
  isShow.value.register = false;
  isShow.value.login = false;
}

function pushProfilePage() {
  authStore.checkAccessToken()
  if(authStore.isLogin) {
    router.push('/profile')
  }
}
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
      <Button v-if="!authStore.isLogin" @click="toggleShowModal('register')" label="Registration" severity="secondary" />
      <Button v-if="!authStore.isLogin" @click="toggleShowModal('login')" label="LogIn" severity="secondary" />
      <div class="btn_wrapper" v-else>
        <Button @click="pushProfilePage" label="Profile" severity="secondary" />
        <Button @click="authStore.logout()" label="LOGOUT" severity="secondary" />
      </div>
    </div>
    <AuthModal :isShow="isShow.register" @close="toggleShowModal('register')" modalType="register" title="Registred form"/>
    <AuthModal :isShow="isShow.login" @close="toggleShowModal('login')" modalType="login" title="Login form"/>
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

.btn_wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
