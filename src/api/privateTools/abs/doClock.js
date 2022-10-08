import request from '@/utils/request'

// 获取用户的employee_id
export function doClock(data) {
  return request({
    url: '/api/privateTools/abs/doClock',
    method: 'post',
    data
  })
}
