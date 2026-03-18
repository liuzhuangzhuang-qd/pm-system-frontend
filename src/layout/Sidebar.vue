<template>
  <div class="sidebar">
    <div class="logo">{{ collapsed ? 'PM' : 'PM System' }}</div>
    <el-menu
      :default-active="activeMenu"
      :collapse="collapsed"
      :collapse-transition="false"
      :background-color="menuColors.background"
      :text-color="menuColors.text"
      :active-text-color="menuColors.activeText"
      router
      unique-opened
      class="menu"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
          <template #title>
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </template>
          <el-menu-item
            v-for="child in route.children.filter((c) => !c.meta?.hidden)"
            :key="child.path"
            :index="joinPath(route.path, child.path)"
          >
            <span>{{ child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/pinia/appStore'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const activeMenu = computed(() => route.path)

const menuColors = computed(() => {
  if (appStore.sidebarTheme === 'light') {
    return {
      background: '#ffffff',
      text: '#303133',
      activeText: 'var(--el-color-primary)'
    }
  }
  return {
    background: '#001529',
    text: '#bfcbd9',
    activeText: '#ffd04b'
  }
})

function joinPath(parent, child) {
  const p = String(parent || '').replace(/\/+$/, '') || '/'
  const c = String(child || '').replace(/^\/+/, '')
  // parent 为 '/' 时避免出现 '//xxx'
  if (p === '/') return `/${c}`
  return `${p}/${c}`.replace(/\/+/g, '/')
}

const menuRoutes = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.meta && r.meta.title && !r.meta.hidden && r.children && r.children.length)
)
</script>

<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu {
  flex: 1;
  border-right: none;
}
</style>

