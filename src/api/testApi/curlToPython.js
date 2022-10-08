import request from '@/utils/request'

export function curlToPython(data) {
  return request({
    url: '/api/testApi/curlToPython',
    method: 'post',
    data
  })
}

export function curlRest(data) {
  return request({
    url: '/api/testApi/runCurl',
    method: 'post',
    data
  })
}
