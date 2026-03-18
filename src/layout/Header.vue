<template>
  <div class="header-left">
    <el-icon class="trigger" @click="toggle">
      <Fold v-if="!collapsed" />
      <Expand v-else />
    </el-icon>
    <span class="title">轻量级项目管理系统</span>
  </div>
  <div class="header-right">
    <el-dropdown>
      <span class="user-info">
        <el-icon><User /></el-icon>
        <span class="name">{{ userStore.userInfo?.nickname || '未登录' }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/pinia/appStore'
import { useUserStore } from '@/pinia/userStore'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()

const collapsed = computed(() => appStore.sidebarCollapsed)

const toggle = () => {
  appStore.toggleSidebar()
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  margin-right: 16px;
}

.title {
  font-size: 16px;
  font-weight: 500;
}

.user-info {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.user-info .name {
  margin-left: 6px;
}
</style>

