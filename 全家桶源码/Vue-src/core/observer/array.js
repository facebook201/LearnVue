/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 缓存 数组的原型
const arrayProto = Array.prototype
// 创建新的对象 实现 arrayMethods.__proto__ === Array.prototype
// arrayMethods 对象的原型是真正的数组构造函数的原型 
export const arrayMethods = Object.create(arrayProto)

// 要拦截的数组变异的方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 缓存原来的方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    // this是数组实例本身 数组和对象都会被定义一个 __ob__ 属性。 并且 里面收集了所有该对象的依赖（观察者）
    const ob = this.__ob__
    // 这里就是要把新增的数据变为响应式的
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        // 当splice有第三个参数的时候 才是添加
        inserted = args.slice(2)
        break
    }
    // 把新增的元素变成响应式的
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 当调用了数组变异方法的时候 必然修改了数组 这时候就要将数组的所有依赖全部拿出来执行。 
    ob.dep.notify()
    return result
  })
})
