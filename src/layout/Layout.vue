<template>
  <el-container class="layout">
    <el-aside :width="sidebarWidth" class="sidebar">
      <Sidebar :collapsed="collapsed" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { useAppStore } from '@/pinia/appStore'

const appStore = useAppStore()
const collapsed = computed(() => appStore.sidebarCollapsed)
const sidebarWidth = computed(() => (collapsed.value ? '64px' : '200px'))
</script>

<style scoped>
.layout {
  height: 100vh;
}

.sidebar {
  background-color: var(--pm-sidebar-bg, #001529);
  color: var(--pm-sidebar-text, #fff);
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main {
  background-color: #f5f7fa;
  padding: 16px;
}
</style>

