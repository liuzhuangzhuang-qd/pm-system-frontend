<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="项目名称">
        <el-input v-model="query.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="query.owner" placeholder="请输入负责人" />
      </el-form-item>
    </CommonSearch>

    <el-button type="primary" style="margin-bottom: 12px" @click="createProject">
      新建项目
    </el-button>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="owner" label="负责人" width="120" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="startTime" label="开始时间" width="160" />
      <el-table-column prop="endTime" label="结束时间" width="160" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetail(scope.row)">详情</el-button>
          <el-button type="primary" link @click="editProject(scope.row)">编辑</el-button>
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
import { fetchProjectList } from '@/api/project'

const router = useRouter()

const query = reactive({
  name: '',
  owner: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchProjectList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.name = ''
  query.owner = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}

function viewDetail(row) {
  router.push(`/project/detail/${row.id}`)
}

function editProject(row) {
  router.push({ path: '/project/config', query: { id: row.id } })
}

function createProject() {
  router.push({ path: '/project/config' })
}
</script>

