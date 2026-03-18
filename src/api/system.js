import request from './request'

export function fetchDictList(params) {
  return request({
    url: '/system/dict/list',
    method: 'get',
    params
  })
}

export function fetchConfigList(params) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params
  })
}

export function fetchOrgList(params) {
  return request({
    url: '/system/org/list',
    method: 'get',
    params
  })
}

