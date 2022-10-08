import request from '@/utils/request'

export function employeeAttendanceRuleInfoList(data) {
  return request({
    url: '/api/privateTools/abs/employeeAttendanceRuleInfoList',
    method: 'post',
    data
  })
}
