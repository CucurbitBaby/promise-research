const Promise = require('./promise.js')

new Promise((resovle, reject) => {  // 匿名函数
  console.log('start')
  resovle(1)
})     
  .then(value => {
    console.log('value', value)
  }, reason => {
    console.log('reason', reason)
})
/*
// 匿名函数this指向undefined
start
D:promise-research-cyan\promise.js:16
      if(this.state === 'pending') {  // 不可逆
*/






//  自定义Promise new Promise时 参数传递错误
//  new Promise(1)  
/*
D:promise-research-cyan\promise.js:5
      throw new TypeError(`Promise resolver ${executor} is not function`)
      ^

TypeError: Promise resolver 1 is not function
*/