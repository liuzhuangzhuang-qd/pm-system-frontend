import request from './request'

// 对应后端接口：POST /api/auth/login
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 对应后端接口：POST /api/auth/refresh
export function refreshToken(token) {
  return request({
    url: '/auth/refresh',
    method: 'post',
    params: { token }
  })
}

// 对应后端接口：POST /api/auth/logout
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 兼容现有前端逻辑的用户信息接口（需要后端提供对应实现）
// 约定：GET /api/auth/user-info 返回 Result<SysUser>
export function getUserInfo() {
  return request({
    url: '/auth/user-info',
    method: 'get'
  })
}

