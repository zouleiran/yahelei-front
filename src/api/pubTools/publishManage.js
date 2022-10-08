import request from '@/utils/request'

export function get_publish(params) {
  return request({
    url: '/api/pubTools/getAllPublish',
    method: 'get',
    params
  })
}

export function get_models() {
  return request({
    url: '/api/pubTools/getModels',
    method: 'get'
  })
}

export function get_pub_types() {
  return request({
    url: '/api/pubTools/getPublishType',
    method: 'get'
  })
}

export function add_publish(data) {
  return request({
    url: '/api/pubTools/addPublish',
    method: 'post',
    data
  })
}

export function del_publish(pk) {
  return request({
    url: `/api/pubTools/delPublish?pk=${pk}`
  })
}

export function finishPublish_publish(pk) {
  return request({
    url: `/api/pubTools/finishPublish?pk=${pk}`,
    method: 'get'
  })
}

export function delay_publish(params) {
  return request({
    url: '/api/pubTools/delayPublish',
    method: 'get',
    params
  })
}

export function get_publish_delay(pk) {
  return request({
    url: `/api/pubTools/getPublishDelay?raw_pk=${pk}`,
    method: 'get'
  })
}
