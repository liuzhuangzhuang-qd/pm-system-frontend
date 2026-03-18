<template>
  <div class="app-container">
    <el-form :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="严重程度">
        <el-select v-model="form.severity" placeholder="请选择">
          <el-option label="致命" value="fatal" />
          <el-option label="严重" value="serious" />
          <el-option label="一般" value="normal" />
          <el-option label="建议" value="suggest" />
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="form.priority" placeholder="请选择">
          <el-option label="P0" value="P0" />
          <el-option label="P1" value="P1" />
          <el-option label="P2" value="P2" />
        </el-select>
      </el-form-item>
      <el-form-item label="复现步骤">
        <el-input v-model="form.steps" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="关联任务">
        <el-button @click="selectTask">选择任务</el-button>
        <span v-if="form.taskId" class="ml-8">已选任务ID：{{ form.taskId }}</span>
      </el-form-item>
      <el-form-item label="附件上传">
        <UploadFile v-model="form.attachments" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="taskDialogVisible" title="选择任务" width="600px">
      <CommonTable :data="taskList">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="primary" link @click="confirmTask(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </CommonTable>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import UploadFile from '@/components/UploadFile.vue'
import CommonTable from '@/components/CommonTable.vue'
import { createBug } from '@/api/bug'

const form = reactive({
  title: '',
  severity: '',
  priority: '',
  steps: '',
  attachments: [],
  taskId: null
})

const taskDialogVisible = ref(false)
const taskList = ref([
  { id: 1, title: '示例任务一' },
  { id: 2, title: '示例任务二' }
])

const selectTask = () => {
  taskDialogVisible.value = true
}

const confirmTask = (row) => {
  form.taskId = row.id
  taskDialogVisible.value = false
}

const submit = async () => {
  await createBug(form)
  ElMessage.success('提交成功')
}
</script>

<style scoped>
.ml-8 {
  margin-left: 8px;
}
</style>

