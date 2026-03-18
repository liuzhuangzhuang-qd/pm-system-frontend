<template>
  <div class="app-container center">
    <el-result
      icon="warning"
      title="403 无权限"
      sub-title="抱歉，您没有访问当前页面的权限，请联系管理员分配角色。"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

