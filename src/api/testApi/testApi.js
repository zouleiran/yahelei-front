import request from '@/utils/request'

export function testApi(data) {
  return request({
    url: '/api/testApi/testApi',
    method: 'post',
    data
  })
}

export function generateCode(data) {
  return request({
    url: '/api/testApi/generateCode',
    method: 'post',
    data
  })
}

