<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="缺陷详情" />
    <el-descriptions v-if="detail" :column="2" border class="mt-16">
      <el-descriptions-item label="标题">{{ detail.title }}</el-descriptions-item>
      <el-descriptions-item label="所属项目">{{ detail.projectName }}</el-descriptions-item>
      <el-descriptions-item label="严重程度">{{ detail.severity }}</el-descriptions-item>
      <el-descriptions-item label="优先级">{{ detail.priority }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-select v-model="detail.status" size="small" @change="onStatusChange">
          <el-option label="待处理" value="open" />
          <el-option label="处理中" value="processing" />
          <el-option label="已解决" value="resolved" />
          <el-option label="已关闭" value="closed" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="提报人">{{ detail.creator }}</el-descriptions-item>
      <el-descriptions-item label="复现步骤" :span="2">
        {{ detail.steps }}
      </el-descriptions-item>
    </el-descriptions>
    <Empty v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import Empty from '@/components/Empty.vue'
import { fetchBugDetail, updateBugStatus } from '@/api/bug'

const route = useRoute()
const detail = ref(null)

onMounted(async () => {
  const res = await fetchBugDetail(route.params.id)
  detail.value = res.data
})

async function onStatusChange(value) {
  if (!detail.value) return
  await updateBugStatus(detail.value.id, value)
  ElMessage.success('状态已更新')
}
</script>

<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>

