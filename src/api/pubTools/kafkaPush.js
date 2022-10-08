import request from '@/utils/request'

export function kafkaPush(data) {
  return request({
    url: '/api/pubTools/kafkaPush',
    method: 'post',
    data
  })
}
