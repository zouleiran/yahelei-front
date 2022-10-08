import request from '@/utils/request'

// 创建入职数据
export function newEmployee(data) {
  return request({
    url: '/api/privateTools/personnel/newEmployee',
    method: 'post',
    data
  })
}
