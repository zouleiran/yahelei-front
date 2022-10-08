import request from '@/utils/request'

// 获取用户的employee_id
export function absAuth(data) {
  return request({
    url: '/api/privateTools/abs/absEasyAuth',
    method: 'post',
    data
  })
}
