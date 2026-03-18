<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="项目详情" />
    <el-descriptions v-if="detail" :column="2" border class="mt-16">
      <el-descriptions-item label="项目名称">{{ detail.name }}</el-descriptions-item>
      <el-descriptions-item label="负责人">{{ detail.owner }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ detail.status }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ detail.startTime }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ detail.endTime }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ detail.remark }}</el-descriptions-item>
    </el-descriptions>
    <Empty v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Empty from '@/components/Empty.vue'
import { fetchProjectDetail } from '@/api/project'

const route = useRoute()
const detail = ref(null)

onMounted(async () => {
  const res = await fetchProjectDetail(route.params.id)
  detail.value = res.data
})
</script>

<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>

