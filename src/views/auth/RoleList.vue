<template>
  <div class="app-container">
    <CommonSearch :model="query" @search="loadData" @reset="reset">
      <el-form-item label="角色名称">
        <el-input v-model="query.name" placeholder="请输入角色名称" />
      </el-form-item>
    </CommonSearch>

    <el-button type="primary" class="mb-12" @click="onCreate">新增角色</el-button>

    <CommonTable :data="list" :pagination="pagination" @update:pageNum="onPageChange">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="code" label="角色编码" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" link @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="onView(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </CommonTable>

    <el-dialog v-model="dialog.visible" :title="dialogTitle" width="520px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code" placeholder="如：ADMIN / PM / DEV / QA" :disabled="dialog.mode === 'view'" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="可选" :disabled="dialog.mode === 'view'" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button v-if="dialog.mode !== 'view'" type="primary" :loading="saving" @click="onSubmit">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonTable from '@/components/CommonTable.vue'
import { fetchRoleList, fetchRoleDetail, createRole, updateRole } from '@/api/role'

const query = reactive({
  name: ''
})

const list = ref([])
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const dialog = reactive({
  visible: false,
  mode: /** @type {'create'|'edit'|'view'} */ ('create'),
  id: null
})

const dialogTitle = computed(() => {
  if (dialog.mode === 'create') return '新增角色'
  if (dialog.mode === 'edit') return '编辑角色'
  return '角色详情'
})

const formRef = ref()
const saving = ref(false)
const form = reactive({
  name: '',
  code: '',
  remark: ''
})

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

onMounted(loadData)

async function loadData() {
  const res = await fetchRoleList({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...query
  })
  list.value = res.data?.records || []
  pagination.total = res.data?.total || 0
}

function resetForm() {
  form.name = ''
  form.code = ''
  form.remark = ''
}

function onCreate() {
  dialog.mode = 'create'
  dialog.id = null
  resetForm()
  dialog.visible = true
}

async function onEdit(row) {
  dialog.mode = 'edit'
  dialog.id = row.id
  resetForm()
  dialog.visible = true
  const res = await fetchRoleDetail(row.id)
  Object.assign(form, {
    name: res.data?.name || '',
    code: res.data?.code || '',
    remark: res.data?.remark || ''
  })
}

async function onView(row) {
  dialog.mode = 'view'
  dialog.id = row.id
  resetForm()
  dialog.visible = true
  const res = await fetchRoleDetail(row.id)
  Object.assign(form, {
    name: res.data?.name || '',
    code: res.data?.code || '',
    remark: res.data?.remark || ''
  })
}

async function onSubmit() {
  await formRef.value?.validate?.()
  saving.value = true
  try {
    if (dialog.mode === 'create') {
      await createRole({ ...form })
      ElMessage.success('新增成功')
    } else if (dialog.mode === 'edit') {
      await updateRole(dialog.id, { ...form, id: dialog.id })
      ElMessage.success('保存成功')
    }
    dialog.visible = false
    loadData()
  } finally {
    saving.value = false
  }
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

<style scoped>
.mb-12 {
  margin-bottom: 12px;
}
</style>

