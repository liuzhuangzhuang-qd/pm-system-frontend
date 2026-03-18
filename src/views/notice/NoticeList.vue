<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="标题">
        <el-input v-model="query.title" placeholder="请输入通知标题" />
      </el-form-item>
    </CommonSearch>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="type" label="类型" width="120" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="createTime" label="发送时间" width="160" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchNoticeList } from '@/api/notice'

const query = reactive({
  title: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(loadData)

async function loadData() {
  const res = await fetchNoticeList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function reset() {
  query.title = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

