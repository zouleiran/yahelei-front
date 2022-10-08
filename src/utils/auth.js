import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key, token) {
  return Cookies.set(key, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
