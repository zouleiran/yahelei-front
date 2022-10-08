import request from '@/utils/request'

// 获取假勤oncall队列
export function getAbsOncallRedisList() {
  return request({
    url: '/api/privateTools/abs/getAbsOncallRedisList',
    method: 'get'
  })
}

// 加人
export function insertAbsOncallList(data) {
  return request({
    url: '/api/privateTools/abs/insertAbsOncallList',
    method: 'post',
    data
  })
}

// 减人
export function delAbsOncallName(data) {
  return request({
    url: '/api/privateTools/abs/delAbsOncallName',
    method: 'post',
    data
  })
}

// 手动轮转
export function rotationAbsOncallName() {
  return request({
    url: '/api/privateTools/abs/rotationAbsOncallName',
    method: 'get'
  })
}
