<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="用户名">
        <el-input v-model="query.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="query.role" placeholder="请输入角色" />
      </el-form-item>
    </CommonSearch>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="roles" label="角色" />
      <el-table-column prop="status" label="状态" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'

// 可对接实际 /auth/user/list 接口

const query = reactive({
  username: '',
  role: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

function loadData() {
  // 调用实际接口，这里先留空
}

function reset() {
  query.username = ''
  query.role = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

