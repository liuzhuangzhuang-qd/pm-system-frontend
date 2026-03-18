import request from './request'

export function fetchNoticeList(params) {
  return request({
    url: '/notice/list',
    method: 'get',
    params
  })
}

