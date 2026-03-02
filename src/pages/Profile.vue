<script setup lang="ts">
import type { User } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref<User | null>(null)

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

onMounted(() => {
  loadProfile()
})
</script>

<template>
  safda
</template>