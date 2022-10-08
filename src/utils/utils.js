import * as _ from 'lodash'

export function calcPX(px) {
  // return ((px * ChartsModule.rootFontSize) / 37.5).toFixed(1)
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue}; ${expires}; path=/; domain=jd.com`
  document.cookie = `${cname}=${cvalue}; ${expires}; path=/; domain=lh-m-jyt-uat.jd.com`
}
export function getCookie(cname) {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
export function isIOS() {
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}
export function isIphoneX() {
  const hasUaOrDpr = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio
  // iPhone X、iPhone XS、iPhone 12 mini
  const isIPhoneX =
    hasUaOrDpr &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 375 &&
    window.screen.height === 812
  // iPhone XS Max
  const isIPhoneXSMax =
    hasUaOrDpr &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 414 &&
    window.screen.height === 896
  // iPhone XR
  const isIPhoneXR =
    hasUaOrDpr &&
    window.devicePixelRatio === 2 &&
    window.screen.width === 414 &&
    window.screen.height === 896

  // iPhone 12、iPhone 12pro
  const isIPhone12 =
    hasUaOrDpr &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 390 &&
    window.screen.height === 844
  // iPhone 12 Pro Max
  const isIPhone12ProMax =
    hasUaOrDpr &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 428 &&
    window.screen.height === 926
  return isIPhoneX || isIPhoneXSMax || isIPhoneXR || isIPhone12 || isIPhone12ProMax
}
