<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="机构名称">
        <el-input v-model="query.name" placeholder="请输入机构名称" />
      </el-form-item>
    </CommonSearch>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="机构名称" />
      <el-table-column prop="parentName" label="上级机构" />
      <el-table-column prop="leader" label="负责人" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchOrgList } from '@/api/system'

const query = reactive({
  name: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchOrgList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.name = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

