import request from './request'

export function fetchBugList(params) {
  return request({
    url: '/bug/list',
    method: 'get',
    params
  })
}

export function fetchBugDetail(id) {
  return request({
    url: `/bug/${id}`,
    method: 'get'
  })
}

export function createBug(data) {
  return request({
    url: '/bug',
    method: 'post',
    data
  })
}

export function updateBugStatus(id, status) {
  return request({
    url: `/bug/${id}/status`,
    method: 'put',
    data: { status }
  })
}

