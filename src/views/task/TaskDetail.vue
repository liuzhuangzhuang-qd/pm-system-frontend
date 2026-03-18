<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="任务详情" />
    <el-descriptions v-if="detail" :column="2" border class="mt-16">
      <el-descriptions-item label="标题">{{ detail.title }}</el-descriptions-item>
      <el-descriptions-item label="所属项目">{{ detail.projectName }}</el-descriptions-item>
      <el-descriptions-item label="负责人">{{ detail.owner }}</el-descriptions-item>
      <el-descriptions-item label="优先级">{{ detail.priority }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-select v-model="detail.status" size="small" @change="onStatusChange">
          <el-option label="待开始" value="todo" />
          <el-option label="进行中" value="doing" />
          <el-option label="已完成" value="done" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="截止时间">{{ detail.deadline }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ detail.remark }}</el-descriptions-item>
    </el-descriptions>
    <Empty v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import Empty from '@/components/Empty.vue'
import { fetchTaskDetail, updateTaskStatus } from '@/api/task'

const route = useRoute()
const detail = ref(null)

onMounted(async () => {
  const res = await fetchTaskDetail(route.params.id)
  detail.value = res.data
})

async function onStatusChange(value) {
  if (!detail.value) return
  await updateTaskStatus(detail.value.id, value)
  ElMessage.success('状态已更新')
}
</script>

<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>

