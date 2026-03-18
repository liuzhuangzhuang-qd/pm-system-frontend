<template>
  <CommonSearch :model="query" @search="loadData" @reset="reset">
    <el-form-item label="参数名称">
      <el-input v-model="query.name" placeholder="请输入参数名称" />
    </el-form-item>
    <el-form-item label="参数键名">
      <el-input v-model="query.key" placeholder="请输入参数键名" />
    </el-form-item>
  </CommonSearch>

  <div class="app-container">
    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="参数名称" />
      <el-table-column prop="key" label="参数键名" />
      <el-table-column prop="value" label="参数键值" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchConfigList } from '@/api/system'

const query = reactive({
  name: '',
  key: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchConfigList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.name = ''
  query.key = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

