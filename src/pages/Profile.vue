<script setup lang="ts">
import type { User } from '@/types/User'
import { Button } from 'primevue'
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const router = useRouter()

const user = ref<User | null>(null)
const editMode = ref(false)

const {userData, update} = useUserStore()

const loadProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if(!response.ok) {
      throw new Error(`${response.text} ${response.status}`)
    }

    const data = await response.json()

    user.value = data
  } catch {
    router.push('/')
  }
}

const toggleEditFields = () => {
  editMode.value = !editMode.value
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div v-if="userData" class="container">
    <Button @click="toggleEditFields" type="button" severity="secondary" label="edit"/>
    <p v-if="userData.name">{{ userData.name }}</p>
    <div class="avatar_wrapper">
      <p class="avatar_title">Avatar</p>
      <img :src="userData.avatar || 'https://i.pravatar.cc'" class="avatar" alt="avatar"/>
    </div>
    <InputText v-if="editMode" type="text" placeholder="Name" v-model="userData.name"/>
    <InputText v-if="editMode" type="text" placeholder="Avatar path" v-model="userData.avatar"/>
    <Button v-if="editMode" @click="update(userData)" type="button" severity="secondary" label="Update"/>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    
    .avatar_wrapper {
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }
  }
</style>