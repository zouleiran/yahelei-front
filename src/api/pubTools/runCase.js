import request from '@/utils/request'

export function runCase(params) {
  return request({
    url: '/api/pubTools/runCase',
    method: 'get',
    params
  })
}
