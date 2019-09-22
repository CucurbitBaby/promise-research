class Promise {
  constructor(executor) {
    // 参数校验
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not function`)
    }

    this.initValue()


    executor(this.resolve, this.reject)
  }

  initValue() {                 // 初始化值
    this.value  = null          // 终值
    this.reason = null          // 拒因
    this.state  = 'pending'     // 状态  
  }

  resolve(value) {                  // 成功后的一系列操作(状态的改变,成功回调的执行)
    if(this.state === 'pending') {  // 不可逆
      this.state = 'fulfilled'      // state change
      this.value = value            // resolve callback
    }
  }

  reject(reason) {                   // 失败后的一系列操作(状态的改变,失败回调的执行)
    if(this.state === 'pending') {   // 不可逆
      this.state  = 'rejected'       // state change
      this.reason = reason           // reject callback
    }
  }
}

module.exports = Promise