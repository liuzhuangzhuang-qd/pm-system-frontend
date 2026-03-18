<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="角色名称">
        <el-input v-model="query.name" placeholder="请输入角色名称" />
      </el-form-item>
    </CommonSearch>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="code" label="角色编码" />
      <el-table-column prop="remark" label="备注" />
    </CommonTable>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'

const query = reactive({
  name: ''
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
  query.name = ''
  pagination.pageNum = 1
  loadData()
}

function onPageChange(page) {
  pagination.pageNum = page
  loadData()
}
</script>

