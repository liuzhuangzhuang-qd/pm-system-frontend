import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const Dashboard = () => import('@/views/dashboard/index.vue')

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/403',
    name: 'NoAuth',
    component: () => import('@/views/error/noAuth/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '工作台', icon: 'House', requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '首页', requiresAuth: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/project',
    component: Layout,
    meta: { title: '项目管理', icon: 'FolderOpened', requiresAuth: true, roles: ['ADMIN', 'PM'] },
    children: [
      {
        path: 'list',
        name: 'ProjectList',
        component: () => import('@/views/project/projectList/index.vue'),
        meta: { title: '项目列表' }
      },
      {
        path: 'detail/:id',
        name: 'ProjectDetail',
        component: () => import('@/views/project/projectDetail/index.vue'),
        meta: { title: '项目详情', hidden: true }
      },
      {
        path: 'config',
        name: 'ProjectConfig',
        component: () => import('@/views/project/projectConfig/index.vue'),
        meta: { title: '项目配置' }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    meta: { title: '任务管理', icon: 'List', requiresAuth: true, roles: ['ADMIN', 'PM', 'DEV'] },
    children: [
      { path: 'list', name: 'TaskList', component: () => import('@/views/task/taskList/index.vue'), meta: { title: '任务列表' } },
      { path: 'detail/:id', name: 'TaskDetail', component: () => import('@/views/task/taskDetail/index.vue'), meta: { title: '任务详情', hidden: true } },
      { path: 'create', name: 'TaskCreate', component: () => import('@/views/task/taskCreate/index.vue'), meta: { title: '创建任务' } }
    ]
  },
  {
    path: '/board',
    component: Layout,
    meta: { title: '任务看板', icon: 'Collection', requiresAuth: true, roles: ['ADMIN', 'PM', 'DEV'] },
    children: [
      { path: 'kanban', name: 'Kanban', component: () => import('@/views/board/kanban/index.vue'), meta: { title: '看板' } }
    ]
  },
  {
    path: '/bug',
    component: Layout,
    meta: { title: '缺陷管理', icon: 'Warning', requiresAuth: true, roles: ['ADMIN', 'QA'] },
    children: [
      { path: 'list', name: 'BugList', component: () => import('@/views/bug/bugList/index.vue'), meta: { title: '缺陷列表' } },
      { path: 'detail/:id', name: 'BugDetail', component: () => import('@/views/bug/bugDetail/index.vue'), meta: { title: '缺陷详情', hidden: true } },
      { path: 'create', name: 'BugCreate', component: () => import('@/views/bug/bugCreate/index.vue'), meta: { title: '缺陷提报' } }
    ]
  },
  {
    path: '/report',
    component: Layout,
    meta: { title: '统计报表', icon: 'DataAnalysis', requiresAuth: true, roles: ['ADMIN', 'PM'] },
    children: [
      { path: 'project', name: 'ProjectReport', component: () => import('@/views/report/projectReport/index.vue'), meta: { title: '项目进度报表' } },
      { path: 'task', name: 'TaskReport', component: () => import('@/views/report/taskReport/index.vue'), meta: { title: '任务完成率报表' } },
      { path: 'bug', name: 'BugReport', component: () => import('@/views/report/bugReport/index.vue'), meta: { title: '缺陷分布报表' } }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'Setting', requiresAuth: true, roles: ['ADMIN'] },
    children: [
      { path: 'theme', name: 'ThemeSettings', component: () => import('@/views/system/themeSettings/index.vue'), meta: { title: '系统主题' } },
      { path: 'dict', name: 'DictList', component: () => import('@/views/system/dictList/index.vue'), meta: { title: '数据字典' } },
      { path: 'config', name: 'ConfigList', component: () => import('@/views/system/configList/index.vue'), meta: { title: '系统配置' } },
      { path: 'org', name: 'OrgList', component: () => import('@/views/system/orgList/index.vue'), meta: { title: '组织机构' } }
    ]
  },
  {
    path: '/auth',
    component: Layout,
    meta: { title: '权限管理', icon: 'UserFilled', requiresAuth: true, roles: ['ADMIN'] },
    children: [
      { path: 'user', name: 'UserList', component: () => import('@/views/auth/userList/index.vue'), meta: { title: '用户管理' } },
      { path: 'role', name: 'RoleList', component: () => import('@/views/auth/roleList/index.vue'), meta: { title: '角色管理' } }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    meta: { title: '通知消息', icon: 'Bell', requiresAuth: true, roles: ['ADMIN', 'PM', 'DEV', 'QA'] },
    children: [
      { path: 'list', name: 'NoticeList', component: () => import('@/views/notice/noticeList/index.vue'), meta: { title: '通知列表' } }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export default router

