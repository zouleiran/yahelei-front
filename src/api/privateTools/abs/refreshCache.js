import request from '@/utils/request'

// 刷缓存
export function refreshCacheFromPre(data) {
  return request({
    url: '/api/privateTools/abs/refreshCacheFromPre',
    method: 'post',
    data
  })
}
