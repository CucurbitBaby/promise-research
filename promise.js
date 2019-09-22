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

    // 实现了链式调用，且改变了后面then的值，必须通过新的Promise实例
    let promise2 = new Promise((resolve, reject) => {
      if(this.state === Promise.FULFILLED) {
        setTimeout(() => {
          const x = onFulfilled(this.value)     
          resolve(x)          
        })
      }
      
      if(this.state === Promise.REJECTED) {
        setTimeout(() => {
          const x = onRejected(this.reason)       
          resolve(x)            
        })
      }
  
      if(this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push(value => {
          setTimeout(() => {
            const x = onFulfilled(value)
            resolve(x)    
          })
        })
  
        this.onRejectedCallbacks.push(reason => {
          setTimeout(() => {
            const x = onFulfilled(reason)
            resolve(x)    
          })
        })
      }
    })

    return promise2
  }
}

Promise.PENDING   = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED  = 'rejected'
Promise.resolvePromise = function(promise2, x, resolve, reject) {

}
module.exports = Promise