import request from '@/utils/request'

export function getReceivePush(params) {
  return request({
    url: '/api/openapi/getReceivePush',
    method: 'get',
    params
  })
}
