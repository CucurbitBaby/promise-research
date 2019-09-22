/*
1. index.js   进行原生的Promise演示
2. promise.js 进行自定义的Promise演示
3. test.js    是对promise.js进行测试
4. 开发过程结合promise/a+规范
//*/

  
const Promise = require('./promise.js')

console.log('1')

new Promise((resovle, reject) => {

  console.log('2')
  resovle(1)

}).then(value => {
    console.log('4')
    console.log('value', value)

  }, reason => {

    console.log('reason', reason)

  }
)

console.log('3')

/*
1
2
4
3
value 1
//*/