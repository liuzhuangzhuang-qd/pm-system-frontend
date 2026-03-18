<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">轻量级项目管理系统</div>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" v-if="showCaptcha">
          <el-input v-model="form.captcha" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.rememberMe">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login, getUserInfo } from '@/api/auth'
import { useUserStore } from '@/pinia/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const showCaptcha = ref(false)

const form = reactive({
  username: '',
  password: '',
  captcha: '',
  rememberMe: false
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

onMounted(() => {
  const cache = localStorage.getItem('pm_login_cache')
  if (cache) {
    const data = JSON.parse(cache)
    form.username = data.username
    form.password = data.password
    form.rememberMe = true
  }
})

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await login({
        username: form.username,
        password: form.password
      })
      const token = res.data?.token
      if (!token) {
        ElMessage.error('登录未返回 token')
        return
      }
      userStore.setToken(token)
      try {
        const userRes = await getUserInfo()
        if (userRes?.data) {
          userStore.setUserInfo(userRes.data)
        } else {
          userStore.setUserInfo({
            username: form.username,
            roles: ['ADMIN']
          })
        }
      } catch {
        // 无用户信息接口或失败时仍进入系统，默认管理员菜单（可按后端实际角色再改）
        userStore.setUserInfo({
          username: form.username,
          roles: ['ADMIN']
        })
      }
      if (form.rememberMe) {
        localStorage.setItem(
          'pm_login_cache',
          JSON.stringify({ username: form.username, password: form.password })
        )
      } else {
        localStorage.removeItem('pm_login_cache')
      }
      ElMessage.success('登录成功')
      const redirect = (route.query.redirect && String(route.query.redirect)) || '/'
      await router.push(redirect)
    } catch (e) {
      // request 拦截器已提示错误时可不再弹窗
      if (!e?.msg) ElMessage.error(e?.message || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
}

.login-box {
  width: 380px;
  padding: 32px 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}
</style>

