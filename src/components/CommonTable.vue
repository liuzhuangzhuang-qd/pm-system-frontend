<template>
  <div class="table-wrap">
    <el-table v-bind="$attrs" :data="data" border style="width: 100%">
      <slot />
    </el-table>
    <div class="pagination" v-if="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="pagination.pageNum"
        :total="pagination.total"
        @size-change="(size) => emit('update:pageSize', size)"
        @current-change="(page) => emit('update:pageNum', page)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:pageNum', 'update:pageSize'])
</script>

<style scoped>
.table-wrap {
  margin-top: 10px;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>

