import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/userStore'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/** 后端统一成功码：0 或 200 */
function isApiSuccess(res) {
  if (res == null || typeof res !== 'object' || !('code' in res)) {
    return true // 非 Result 结构（如纯文本）视为成功，直接透传
  }
  return res.code === 0 || res.code === 200
}

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (!isApiSuccess(res)) {
      ElMessage.error(res.msg || '请求失败')
      if (res.code === 401) {
        ElMessageBox.confirm('登录已过期，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const userStore = useUserStore()
          userStore.logout()
          window.location.href = '/#/login'
        })
      }
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    ElMessage.error(error.message || '服务器错误')
    return Promise.reject(error)
  }
)

export default service

