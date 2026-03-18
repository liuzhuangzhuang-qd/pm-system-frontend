import request from './request'

export function fetchBoardColumns(params) {
  return request({
    url: '/board/columns',
    method: 'get',
    params
  })
}

export function saveBoardColumns(data) {
  return request({
    url: '/board/columns',
    method: 'post',
    data
  })
}

export function updateTaskColumn(taskId, columnId) {
  return request({
    url: '/board/task/move',
    method: 'post',
    data: { taskId, columnId }
  })
}

