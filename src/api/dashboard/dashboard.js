import request from '@/utils/request'

export function getYearCoreBugs() {
  return request({
    url: '/api/dashboard/getYearCoreBugs',
    method: 'get'
  })
}

export function getYearModuleCoreBugs() {
  return request({
    url: '/api/dashboard/getYearModuleCoreBugs',
    method: 'get'
  })
}

export function leakage() {
  return request({
    url: '/api/dashboard/leakage',
    method: 'get'
  })
}

export function selectCase() {
  return request({
    url: '/api/dashboard/selectCase',
    method: 'get'
  })
}

export function jiraTestBugCount() {
  return request({
    url: '/api/dashboard/jiraTestBugCount',
    method: 'get'
  })
}

export function selectAutoApiTest1() {
  return request({
    url: '/api/dashboard/selectAutoApiTest1',
    method: 'get'
  })
}

export function selectAutoApiCore() {
  return request({
    url: '/api/dashboard/selectAutoApiCore',
    method: 'get'
  })
}

export function totalAutoCase() {
  return request({
    url: '/api/dashboard/totalAutoCase',
    method: 'get'
  })
}

export function moduleCase() {
  return request({
    url: '/api/dashboard/moduleCase',
    method: 'get'
  })
}

export function qualityLine(data) {
  return request({
    url: '/api/dashboard/qualityLine',
    method: 'post',
    data
  })
}

export function leakageModule() {
  return request({
    url: '/api/dashboard/leakageModule',
    method: 'get'
  })
}

export function qualityBugList(data) {
  return request({
    url: '/api/dashboard/qualityBugList',
    method: 'post',
    data
  })
}
