import type { User } from '@/types/User';
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userData = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  function update(userUpdatedData: User) {
    userData.value = userUpdatedData

    fetch(`${baseUrl}/users/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userUpdatedData)
    })
  }

  return {userData, update}
})