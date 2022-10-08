import request from '@/utils/request'

export function get_tenantId(data) {
  return request({
    url: '/api/pubTools/getTenantId',
    method: 'post',
    data
  })
}
