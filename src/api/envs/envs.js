import request from '@/utils/request'

export function GetAllEnvs() {
  return request({
    url: '/api/envs/GetAllEnvs',
    method: 'get'
  })
}
