<template>
  <el-upload
    class="upload-demo"
    action="#"
    :http-request="dummyRequest"
    :file-list="fileList"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    multiple
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        支持上传多个附件，大小由后端限制
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const fileList = ref([])

watch(
  () => props.modelValue,
  (val) => {
    fileList.value = val
  },
  { immediate: true, deep: true }
)

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess({ url: URL.createObjectURL(file) })
  }, 500)
}

const handleSuccess = (response, file, list) => {
  emit('update:modelValue', list)
}

const handleRemove = (file, list) => {
  emit('update:modelValue', list)
}
</script>

<style scoped>
.upload-demo {
  display: inline-block;
}
</style>

