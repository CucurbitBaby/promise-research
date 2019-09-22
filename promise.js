class Promise {
  constructor(executor) {
    // 参数校验
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not function`)
    }

    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch(e) {
      this.reject(e)
    }
  }

  initBind() { // bind this
    this.resolve  = this.resolve.bind(this)
    this.reject   = this.reject.bind(this)
  }

  initValue() {                       // 初始化值
    this.value  = null                // 终值
    this.reason = null                // 拒因
    this.state  = Promise.PENDING     // 状态  
    this.onFulfilledCallbacks = []    // 存放成功回调
    this.onRejectedCallbacks  = []    // 存放失败回调
  }

  resolve(value) {                          // 成功后的一系列操作(状态的改变,成功回调的执行)
    if(this.state === Promise.PENDING) {    // 不可逆
      this.state = Promise.FULFILLED        // state change
      this.value = value                    // resolve callback
      this.onFulfilledCallbacks.forEach(fn => fn(this.value))
    }
  }

  reject(reason) {                         // 失败后的一系列操作(状态的改变,失败回调的执行)
    if(this.state === Promise.PENDING) {   // 不可逆
      this.state  = Promise.REJECTED       // state change
      this.reason = reason                 // reject callback
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }

  then(onFulfilled, onRejected) {
    if(typeof onFulfilled !== 'function') { // 参数校验
      onFulfilled = function(value) {       
        return value                        
      }
    }

    if(typeof onRejected !== 'function') {  // 参数校验
      onRejected = function(reason) {
        throw reason
      }
    }

    if(this.state === Promise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)               
      })
    }
    
    if(this.state === Promise.REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)               
      })
    }

    if(this.state === Promise.PENDING) {
      this.onFulfilledCallbacks.push(value => {
        setTimeout(() => {
          onFulfilled(value)
        })
      })

      this.onRejectedCallbacks.push(reason => {
        setTimeout(() => {
          onFulfilled(reason)
        })
      })
    }
  }
}

Promise.PENDING   = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED  = 'rejected'

module.exports = Promise