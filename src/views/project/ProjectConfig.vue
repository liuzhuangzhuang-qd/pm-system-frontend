<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="项目配置" />
    <el-form :model="form" label-width="100px" class="mt-16">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.owner" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="进行中" value="running" />
          <el-option label="已完成" value="done" />
          <el-option label="已暂停" value="paused" />
        </el-select>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="form.range"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.remark" :rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { fetchProjectDetail, saveProject } from '@/api/project'

const route = useRoute()

const form = reactive({
  id: null,
  name: '',
  owner: '',
  status: 'running',
  range: [],
  remark: ''
})

onMounted(async () => {
  const id = route.query.id
  if (id) {
    const res = await fetchProjectDetail(id)
    Object.assign(form, res.data)
  }
})

async function save() {
  await saveProject(form)
  ElMessage.success('保存成功')
}
</script>

<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>

