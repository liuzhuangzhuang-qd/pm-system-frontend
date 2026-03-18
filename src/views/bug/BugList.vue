<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="标题">
        <el-input v-model="query.title" placeholder="请输入缺陷标题" />
      </el-form-item>
      <el-form-item label="严重程度">
        <el-select v-model="query.severity" clearable placeholder="选择严重程度">
          <el-option label="致命" value="fatal" />
          <el-option label="严重" value="serious" />
          <el-option label="一般" value="normal" />
          <el-option label="建议" value="suggest" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" clearable placeholder="选择状态">
          <el-option label="待处理" value="open" />
          <el-option label="处理中" value="processing" />
          <el-option label="已解决" value="resolved" />
          <el-option label="已关闭" value="closed" />
        </el-select>
      </el-form-item>
    </CommonSearch>

    <el-button type="primary" style="margin-bottom: 12px" @click="createBug">
      新建缺陷
    </el-button>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="projectName" label="所属项目" />
      <el-table-column prop="severity" label="严重程度" width="100" />
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="formatBugStatus(scope.row.status).type">
            {{ formatBugStatus(scope.row.status).text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="提报人" width="120" />
      <el-table-column prop="createTime" label="提报时间" width="160" />
      <el-table-column label="操作" width="140">
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
import { fetchBugList } from '@/api/bug'
import { formatBugStatus } from '@/utils/format'

const router = useRouter()

const query = reactive({
  title: '',
  severity: '',
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
  const res = await fetchBugList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.title = ''
  query.severity = ''
  query.status = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}

function viewDetail(row) {
  router.push(`/bug/detail/${row.id}`)
}

function createBug() {
  router.push('/bug/create')
}
</script>

