import { defineStore } from 'pinia'

const TOKEN_KEY = 'pm_token'
const USER_INFO_KEY = 'pm_user_info'

/** 与路由 meta.roles 对齐，管理员拥有即展示全部侧栏菜单 */
const ALL_MENU_ROLES = ['ADMIN', 'PM', 'DEV', 'QA']

function extractRoles(userInfo) {
  if (!userInfo) return []
  let r = userInfo.roles ?? userInfo.role ?? userInfo.roleCodes
  if (r == null || r === '') return []
  if (!Array.isArray(r)) r = [r]
  return r
    .map((x) => String(x).trim().toUpperCase())
    .filter(Boolean)
}

function isAdminRoleList(roles) {
  return roles.some((r) =>
    ['ADMIN', 'ADMINISTRATOR', 'SUPER_ADMIN', 'ROLE_ADMIN'].includes(String(r).toUpperCase())
  )
}

/** 无任何角色字段时，按用户名 / 标记推断管理员 */
function inferAdminRoles(userInfo) {
  if (!userInfo) return []
  if (userInfo.isAdmin === true || userInfo.admin === true) return [...ALL_MENU_ROLES]
  const u = String(userInfo.username || '').toLowerCase()
  if (u === 'admin' || u === 'administrator') return [...ALL_MENU_ROLES]
  return []
}

/** 管理员默认展示所有菜单：展开为路由所需的全部角色 */
function expandAdminToAllMenus(roles) {
  if (!roles.length) return roles
  if (isAdminRoleList(roles)) return [...ALL_MENU_ROLES]
  return roles
}

function resolveRoles(userInfo, previousRoles = []) {
  let roles = extractRoles(userInfo)
  if (!roles.length && previousRoles.length) {
    roles = [...previousRoles]
  }
  if (!roles.length) {
    roles = inferAdminRoles(userInfo)
  }
  return expandAdminToAllMenus(roles)
}

export const useUserStore = defineStore('user', {
  state: () => {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || 'null') || null
    return {
      token: localStorage.getItem(TOKEN_KEY) || '',
      userInfo,
      roles: resolveRoles(userInfo, [])
    }
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.roles = resolveRoles(userInfo, this.roles)
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
    },
    logout() {
      this.token = ''
      this.userInfo = null
      this.roles = []
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_INFO_KEY)
    }
  }
})
