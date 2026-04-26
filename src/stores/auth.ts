import type { LoginErrorData } from '@/types/Error';
import type { LoginData } from '@/types/LoginData';
import type { User } from '@/types/User';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const router = useRouter()
  
  const token = ref(localStorage.getItem('token'))

  const isLogin = computed(() => {
    if (!token.value) return false
    
    try {
      const decoded: JwtPayload = jwtDecode(token.value)
      const currentTime = Date.now() / 1000
      return !!(decoded.exp && decoded.exp > currentTime)
    } catch {
      return false
    }
  })

  async function login (values: Record<string, unknown>) {
      const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'Post',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      }
      });

      const data: LoginData | LoginErrorData = await res.json()
      
      if(!res.ok) {
        const errorData = data as LoginErrorData

        throw errorData.message
      }
        saveData(data as LoginData)
   }

  function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = null
    router.push('/')
  }

  async function register(values: Record<string, unknown>) {
    const res = await fetch(`${baseUrl}/users/create`, {
        method: 'Post',
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        }
      });

   const data: LoginData | LoginErrorData = await res.json()
    
   if(!res.ok) {
      const errorData = data as LoginErrorData

      throw errorData.message
    }
    
    saveData(data as LoginData)
  }

  function saveData(data: LoginData) {
    const token: string | null = data.access_token
    const userData: User | null = data.user

    if(token) {
      saveAccessToken(token)
    }
    if(userData) {
      saveUserData(userData)
    }
  }

  function saveAccessToken(newToken: string) {
    localStorage.setItem('token', newToken)
    token.value = newToken
  }

  function saveUserData(userData: User) {
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function checkAccessToken() {
    token.value = localStorage.getItem('token')
    return isLogin.value
  }

  return {
    isLogin,
    checkAccessToken,
    login,
    logout,
    register
  }
})