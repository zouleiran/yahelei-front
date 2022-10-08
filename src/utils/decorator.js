/**
 * 输出方法日日志
 * @param {*} type
 */
export const log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value
    descriptor.value = (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`)
      let ret
      try {
        ret = method.apply(target, args)
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`)
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`)
      }
      return ret
    }
  }
}

/**
 * 防抖，连续操作时，只在最后一次触发
 * @export
 * @param {Function} fun - 运行函数
 * @param {Number} wait - 延迟时间
 * @returns
 */
export function debounce(wait) {
  return function(target, name, descriptor) {
    const fn = descriptor.value
    let timer = null
    descriptor.value = function() {
      const _this = this._isVue ? this : target
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(_this, arguments)
      }, wait)
    }
  }
}
/**
 * 自动开启loading
 * @export
 * @param {string} [loadingKey='loading']
 * @returns
 */
export function autoSwitch(loadingKey = 'loading') {
  return function(target, name, descriptor) {
    const method = descriptor.value
    descriptor.value = async function() {
      const _this = this._isVue ? this : target
      _this[loadingKey] = true // 开启
      const [err, result] = await to(method.apply(_this, arguments))
      _this[loadingKey] = false // 关闭
      return err || result
    }
  }
}
