<template>
  <el-form
    :model="model"
    inline
    class="search-form"
    @keyup.enter.native="onSearch"
  >
    <slot />
    <el-form-item>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['search', 'reset'])

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}
</script>

<style scoped>
.search-form {
  margin-bottom: 16px;
}
</style>

