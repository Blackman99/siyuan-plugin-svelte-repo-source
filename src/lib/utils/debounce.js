export default (fn, timeout = 1000) => {
  let timer
  return (...params) => {
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn(...params)
      timer = null
    }, timeout)
  }
}