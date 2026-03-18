<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="创建任务" />
    <el-form :model="form" label-width="100px" class="mt-16">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="所属项目">
        <el-input v-model="form.projectName" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.owner" />
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="form.priority">
          <el-option label="P0" value="P0" />
          <el-option label="P1" value="P1" />
          <el-option label="P2" value="P2" />
        </el-select>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker v-model="form.deadline" type="datetime" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.remark" :rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { createTask } from '@/api/task'

const form = reactive({
  title: '',
  projectName: '',
  owner: '',
  priority: 'P2',
  deadline: '',
  remark: ''
})

async function submit() {
  await createTask(form)
  ElMessage.success('创建成功')
}
</script>

<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>

