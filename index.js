/*
1. index.js   进行原生的Promise演示
2. promise.js 进行自定义的Promise演示
3. test.js    是对promise.js进行测试
4. 开发过程结合promise/a+规范
//*/



console.log('1')

new Promise((resovle, reject) => {
  throw new Error('haha, this is error')
  resovle(1)

  
}).then(value => {
  console.log('4')
  console.log('value', value)

}, reason => {

  console.log('reason', reason)

})

console.log('3')

/*
1
3
reason Error: haha, this is error
//*/