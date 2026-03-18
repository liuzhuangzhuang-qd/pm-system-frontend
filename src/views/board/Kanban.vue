<template>
  <div class="app-container kanban">
    <div class="kanban-header">
      <el-select v-model="filters.owner" placeholder="负责人" clearable style="width: 160px">
        <el-option label="张三" value="zhangsan" />
        <el-option label="李四" value="lisi" />
      </el-select>
      <el-select
        v-model="filters.priority"
        placeholder="优先级"
        clearable
        style="width: 160px; margin-left: 12px"
      >
        <el-option label="P0" value="P0" />
        <el-option label="P1" value="P1" />
        <el-option label="P2" value="P2" />
      </el-select>
      <el-button type="primary" style="margin-left: auto" @click="openColumnConfig">
        列配置
      </el-button>
    </div>
    <div class="kanban-body">
      <div
        v-for="column in columns"
        :key="column.id"
        class="kanban-column"
        :data-id="column.id"
      >
        <div class="kanban-column-header">
          <span>{{ column.name }}</span>
          <span class="count">{{ column.tasks.length }}</span>
        </div>
        <div class="kanban-column-body" :ref="setColumnRef(column.id)">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            class="kanban-card"
            :data-id="task.id"
          >
            <div class="title">{{ task.title }}</div>
            <div class="meta">
              <el-tag type="info" size="small">{{ task.owner }}</el-tag>
              <el-tag type="danger" size="small" effect="plain">{{ task.priority }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="columnDialogVisible" title="列配置" width="400px">
      <el-form :model="editColumns">
        <el-form-item
          v-for="(col, index) in editColumns"
          :key="col.id"
          :label="`列${index + 1}`"
        >
          <el-input v-model="col.name" />
          <el-button type="danger" link @click="removeColumn(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addColumn">新增列</el-button>
        <el-button @click="columnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveColumns">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Sortable from 'sortablejs'
import { fetchBoardColumns, updateTaskColumn, saveBoardColumns } from '@/api/board'

const filters = reactive({
  owner: '',
  priority: ''
})

const columns = ref([])
const columnDialogVisible = ref(false)
const editColumns = ref([])
const columnRefs = new Map()

const setColumnRef = (id) => (el) => {
  if (el) {
    columnRefs.set(id, el)
  }
}

onMounted(async () => {
  await loadColumns()
  initDrag()
})

const loadColumns = async () => {
  const res = await fetchBoardColumns({})
  columns.value = res.data || []
}

const initDrag = () => {
  columns.value.forEach((column) => {
    const el = columnRefs.get(column.id)
    if (!el) return
    Sortable.create(el, {
      group: 'tasks',
      animation: 150,
      onEnd: async (evt) => {
        const taskId = evt.item.dataset.id
        const newColumnId = evt.to.dataset.id
        await updateTaskColumn(taskId, newColumnId)
        loadColumns()
      }
    })
  })
}

const openColumnConfig = () => {
  editColumns.value = columns.value.map((c) => ({ ...c }))
  columnDialogVisible.value = true
}

const addColumn = () => {
  editColumns.value.push({ id: `temp_${Date.now()}`, name: '新列', tasks: [] })
}

const removeColumn = (index) => {
  editColumns.value.splice(index, 1)
}

const saveColumns = async () => {
  await saveBoardColumns(editColumns.value)
  columnDialogVisible.value = false
  await loadColumns()
  initDrag()
}
</script>

<style scoped>
.kanban {
  display: flex;
  flex-direction: column;
}

.kanban-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.kanban-body {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.kanban-column {
  width: 260px;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 8px;
}

.kanban-column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
}

.kanban-column-header .count {
  color: #909399;
  font-size: 12px;
}

.kanban-column-body {
  min-height: 60px;
}

.kanban-card {
  background-color: #fff;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: grab;
}

.kanban-card .title {
  font-size: 14px;
  margin-bottom: 6px;
}

.kanban-card .meta {
  display: flex;
  gap: 4px;
}
</style>

