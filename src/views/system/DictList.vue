<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="字典名称">
        <el-input v-model="query.name" placeholder="请输入字典名称" />
      </el-form-item>
      <el-form-item label="字典编码">
        <el-input v-model="query.code" placeholder="请输入字典编码" />
      </el-form-item>
    </CommonSearch>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="字典名称" />
      <el-table-column prop="code" label="字典编码" />
      <el-table-column prop="remark" label="备注" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchDictList } from '@/api/system'

const query = reactive({
  name: '',
  code: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchDictList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.name = ''
  query.code = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

