import request from '@/utils/request'

// 创建入职数据
export function createOnboarding(data) {
  return request({
    url: '/api/privateTools/personnel/createOnboarding',
    method: 'post',
    data
  })
}
