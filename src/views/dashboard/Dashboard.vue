<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card>
          <div class="stat-title">项目总数</div>
          <div class="stat-value">{{ stats.projectCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-title">进行中任务</div>
          <div class="stat-value">{{ stats.runningTask }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-title">待处理缺陷</div>
          <div class="stat-value">{{ stats.openBug }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-title">未读通知</div>
          <div class="stat-value">{{ stats.unreadNotice }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const stats = reactive({
  projectCount: 0,
  runningTask: 0,
  openBug: 0,
  unreadNotice: 0
})
</script>

<style scoped>
.stat-title {
  color: #909399;
  font-size: 14px;
}

.stat-value {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
}
</style>

