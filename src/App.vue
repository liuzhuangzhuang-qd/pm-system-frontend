<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/pinia/appStore'

const appStore = useAppStore()

onMounted(() => {
  appStore.applyTheme()
})
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif;
}
</style>

