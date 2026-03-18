import request from './request'

export function fetchProjectReport(params) {
  return request({
    url: '/report/project',
    method: 'get',
    params
  })
}

export function fetchTaskReport(params) {
  return request({
    url: '/report/task',
    method: 'get',
    params
  })
}

export function fetchBugReport(params) {
  return request({
    url: '/report/bug',
    method: 'get',
    params
  })
}

