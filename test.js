/*
1. index.js   进行原生的Promise演示
2. promise.js 进行自定义的Promise演示
3. test.js    是对promise.js进行测试
4. 开发过程结合promise/a+规范
//*/

  
const Promise = require('./promise.js')

new Promise((resovle, reject) => {
  
  setTimeout(() => {
    resovle(1)
  })

  
})
  .then(
    value => {
      return ('链式+' + value)
    }, 
    reason => {
      console.log('reason', reason)
    }
  )

  .then(
    value => {
      console.log('value', value)
    },
    reason => {
      console.log('reason', reason)
    }
  )

/*
value 链式+1
//*/