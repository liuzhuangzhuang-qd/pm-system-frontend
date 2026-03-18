<template>
  <el-empty
    :description="description"
    :image-size="120"
  />
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    default: '暂无数据'
  }
})
</script>

