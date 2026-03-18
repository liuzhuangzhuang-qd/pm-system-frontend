import request from './request'

// 对应后端接口：GET /api/projects
export function fetchProjectList(params) {
  const { pageNum, pageSize, ...rest } = params || {}
  return request({
    url: '/projects',
    method: 'get',
    params: {
      pageNo: pageNum,
      pageSize,
      ...rest
    }
  })
}

// 对应后端接口：GET /api/projects/{id}
export function fetchProjectDetail(id) {
  return request({
    url: `/projects/${id}`,
    method: 'get'
  })
}

// 对应后端接口：
// - POST /api/projects
// - PUT  /api/projects/{id}
export function saveProject(data) {
  const hasId = data && data.id
  return request({
    url: hasId ? `/projects/${data.id}` : '/projects',
    method: hasId ? 'put' : 'post',
    data
  })
}

// 对应后端接口：GET /api/project-config/{projectId}
export function fetchProjectConfig(projectId) {
  return request({
    url: `/project-config/${projectId}`,
    method: 'get'
  })
}

