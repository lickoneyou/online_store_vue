import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const baseUrl = 'http://localhost:3000/';
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
    const res = await fetch(`${baseUrl}auth/login`, {
      method: 'Post',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json()
    
    const token: string | null = data.access_token
    if(token) {
      saveAccessToken(token)
    }
  }

  function logout () {
    localStorage.removeItem('token')
    router.push('/')
  }

  async function register(values: Record<string, unknown>) {
    const res = await fetch(`${baseUrl}users/create`, {
        method: 'Post',
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        }
      });

    const data = await res.json()
    
    const token: string | null = data.access_token
    if(token) {
      saveAccessToken(token)
    }
  }

  function saveAccessToken(newToken: string) {
    localStorage.setItem('token', newToken)
    token.value = newToken
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