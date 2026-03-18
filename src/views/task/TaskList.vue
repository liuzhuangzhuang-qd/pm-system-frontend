<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="任务标题">
        <el-input v-model="query.title" placeholder="请输入任务标题" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="query.owner" placeholder="请输入负责人" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" clearable placeholder="选择状态">
          <el-option label="待开始" value="todo" />
          <el-option label="进行中" value="doing" />
          <el-option label="已完成" value="done" />
        </el-select>
      </el-form-item>
    </CommonSearch>

    <el-button type="primary" style="margin-bottom: 12px" @click="createTask">
      新建任务
    </el-button>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="projectName" label="所属项目" />
      <el-table-column prop="owner" label="负责人" width="120" />
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="formatTaskStatus(scope.row.status).type">
            {{ formatTaskStatus(scope.row.status).text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="160" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchTaskList } from '@/api/task'
import { formatTaskStatus } from '@/utils/format'

const router = useRouter()

const query = reactive({
  title: '',
  owner: '',
  status: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchTaskList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.title = ''
  query.owner = ''
  query.status = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}

function viewDetail(row) {
  router.push(`/task/detail/${row.id}`)
}

function createTask() {
  router.push('/task/create')
}
</script>

