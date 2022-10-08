import request1 from '@/utils/requestenv'

export function testrequestget(data,url) {
  return request1({
    method: 'get',
    url: url,
    params: data
  })
}
  export function testrequestpost(data,url) {
    return request1({
      method: 'post',
      url: url,
      data: data
    })
}

