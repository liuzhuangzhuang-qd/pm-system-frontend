import router, { asyncRoutes } from './index'
import { useUserStore } from '@/pinia/userStore'
import { getUserInfo, getAuthRoutes } from '@/api/auth'
import { transformBackendRoutes } from './routeLoader'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']

let routesAdded = false

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const hasToken = userStore.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!routesAdded) {
        try {
          // 有 token 但本地无角色信息时，拉取用户信息（与后端 code:0 成功结构一致）
          if (!userStore.roles?.length) {
            const userRes = await getUserInfo()
            const info = userRes?.data
            if (info) {
              userStore.setUserInfo(info)
            }
          }
        } catch {
          // 拉取失败仍放行静态路由，避免白屏
        }
        // 动态菜单：优先从后端下发路由
        try {
          const res = await getAuthRoutes()
          const backendAsync = res?.data?.asyncRoutes || []
          const toAdd = transformBackendRoutes(backendAsync)
          toAdd.forEach((r) => router.addRoute(r))
        } catch {
          // 后端动态路由不可用时，回退到本地静态 asyncRoutes + 角色过滤
          const roles = userStore.roles?.length ? userStore.roles : resolveRolesForMenu(userStore.userInfo)
          const accessRoutes = filterAsyncRoutesByRoles(asyncRoutes, roles)
          accessRoutes.forEach((r) => router.addRoute(r))
        }
        routesAdded = true
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/** 用户信息里未写入 store.roles 时，再解析一次（管理员 → 全部动态菜单） */
function resolveRolesForMenu(userInfo) {
  if (!userInfo) return []
  let r = userInfo.roles ?? userInfo.role
  if (r != null && !Array.isArray(r)) r = [r]
  r = (r || []).map((x) => String(x).trim().toUpperCase()).filter(Boolean)
  if (r.some((x) => ['ADMIN', 'ADMINISTRATOR', 'SUPER_ADMIN', 'ROLE_ADMIN'].includes(x))) {
    return ['ADMIN', 'PM', 'DEV', 'QA']
  }
  const u = String(userInfo.username || '').toLowerCase()
  if (userInfo.isAdmin === true || u === 'admin' || u === 'administrator') {
    return ['ADMIN', 'PM', 'DEV', 'QA']
  }
  return r
}

function filterAsyncRoutesByRoles(routes, roles) {
  if (!roles || roles.length === 0) return []
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (!tmp.meta || !tmp.meta.roles || hasPermission(roles, tmp.meta.roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoles(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

function hasPermission(roles, routeRoles) {
  return roles.some((role) => routeRoles.includes(role))
}

