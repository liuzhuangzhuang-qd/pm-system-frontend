<template>
  <div class="app-container">
    <el-card shadow="never">
      <template #header>
        <div class="title">系统主题</div>
      </template>

      <el-form label-width="120px">
        <el-form-item label="主体色">
          <el-color-picker v-model="primaryColor" />
          <el-button class="ml-12" type="primary" @click="applyPrimary">应用</el-button>
        </el-form-item>

        <el-form-item label="菜单栏风格">
          <el-radio-group v-model="sidebarTheme">
            <el-radio-button label="dark">深色</el-radio-button>
            <el-radio-button label="light">浅色</el-radio-button>
          </el-radio-group>
          <el-button class="ml-12" @click="applySidebarTheme">应用</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/pinia/appStore'

const appStore = useAppStore()

const primaryColor = ref(appStore.primaryColor)
const sidebarTheme = ref(appStore.sidebarTheme)

function applyPrimary() {
  appStore.setPrimaryColor(primaryColor.value)
}

function applySidebarTheme() {
  appStore.setSidebarTheme(sidebarTheme.value)
}

// 即时预览：选中就生效
watch(primaryColor, (v) => appStore.setPrimaryColor(v))
watch(sidebarTheme, (v) => appStore.setSidebarTheme(v))
</script>

<style scoped>
.title {
  font-weight: 600;
}
.ml-12 {
  margin-left: 12px;
}
</style>

