import { useUserStore } from '@/pinia/userStore'

export function getToken() {
  const userStore = useUserStore()
  return userStore.token
}

export function isLoggedIn() {
  return !!getToken()
}

