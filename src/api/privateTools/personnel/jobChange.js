import request from '@/utils/request'

// 离职接口
export function jobChange(data) {
  return request({
    url: '/api/privateTools/personnel/jobChange',
    method: 'post',
    data
  })
}
