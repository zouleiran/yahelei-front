import request from '@/utils/request'

// 获取用户的employee_id
export function getEmployeeIdList(data) {
  return request({
    url: '/api/privateTools/personnel/getEmployeeId',
    method: 'post',
    data
  })
}
