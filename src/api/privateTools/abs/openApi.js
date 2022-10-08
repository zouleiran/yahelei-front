import request from '@/utils/request'

// 刷缓存
export function getOpenApiData(data) {
  return request({
    url: '/api/privateTools/abs/openApiData',
    method: 'post',
    data
  })
}
