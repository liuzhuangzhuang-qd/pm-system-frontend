import request from './request'

// 对应后端接口：GET /api/tasks
export function fetchTaskList(params) {
  const { pageNum, pageSize, ...rest } = params || {}
  return request({
    url: '/tasks',
    method: 'get',
    params: {
      pageNo: pageNum,
      pageSize,
      ...rest
    }
  })
}

// 对应后端接口：GET /api/tasks/{id}
export function fetchTaskDetail(id) {
  return request({
    url: `/tasks/${id}`,
    method: 'get'
  })
}

// 对应后端接口：POST /api/tasks
export function createTask(data) {
  return request({
    url: '/tasks',
    method: 'post',
    data
  })
}

// 对应后端接口：PUT /api/tasks/{id}
export function updateTaskStatus(id, status) {
  return request({
    url: `/tasks/${id}`,
    method: 'put',
    data: { id, status }
  })
}

