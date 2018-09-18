/* @flow */

import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isPrimitive,
  isUndef,
  isValidArrayIndex,
  isServerRendering
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
export let shouldObserve: boolean = true

export function toggleObserving (value: boolean) {
  shouldObserve = value
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  // 这里 constructor 传的参数就是 new Observer 传的参数 第一个参数就是要观测的对象
  // Dep 是用来收集依赖的筐 它属于某个对象或数组
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    // ____ 属性是Observer的实例
    // def 函数简单封装了 Object.defineProperty 这样可以定义__ob__ 为不可枚举的属性 避免后面遍历数据对象的时候 防止遍历到 __ob__属性
    /**
    那么value会变成
    const data = {
      a: 1,
      // 不可枚举的属性
      __ob__: {
        value: data,
        dep: dep实例对象
        vmCount: 0
      }
    };
     */
    def(value, '__ob__', this)
    // 接着处理纯对象 数据和纯对象的处理方法是不一样的
    // 数组有很多变异的方法 可以改变自身 当调用这些方法的时候需要出发依赖 这时候要做出反应
    if (Array.isArray(value)) {
      // 因为 __proto__ 是在IE11 才支持的东西 
      // 所以在IE11下面 通过直接定义一个方法来覆盖 修改目标对象或数组
      const augment = hasProto
        ? protoAugment
        : copyAugment
      // value.__proto__ = arrayMethods.__proto__
      // 第一个参数是实例本身 第二个参数是代理原型 
      augment(value, arrayMethods, arrayKeys)
      // 上面的代码是为了把数组实例与代理原型或代理原型中定义的函数联系起 从而拦截数组变异方法
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      // 遍历纯对象的每一个属性 来调用 defineReactive方法
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   * 把数组遍历 如果数组里面还有数组或者对象 然后通过observe 变成响应式
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 * 通过设置数组实例的 __proto__ 属性 代理指向一个代理原型 从而做到拦截
 */
function protoAugment (target, src: Object, keys: any) {
  /* eslint-disable no-proto */
  // 将数组实例的原型指向代理原型 arrayMethods
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 * 
 */
/* istanbul ignore next */
// 实例本身 [] src 第二个参数是代理原型 
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    // key 是实例方法
    const key = keys[i]
    // target 数组实例 key 是方法名 src[key] 返回的方法结果值
    def(target, key, src[key])
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 * 尝试为value 创造一个观察者实例 如果观察成功返回一个新的观察者 如果已经有了一个 则返回现有的观察者
 */

 // observe(data, true /* asRootData */)
 // data 就是vue实例的 data() { return {} }

export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 是否是一个对象 或者是VNode的实例
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  // 定义 ob 来保存Observer实例 
  let ob: Observer | void

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    // 如果存在 __ob__ 属性 表示Observer 已经有实例了 返回这个实例就好了 避免重复观察
    ob = value.__ob__
  } else if (
    /** 如果没有定义 __ob__ 属性 
     *  1 shouldObserve 判断是否应该观测 有个toggleObserving函数接收一个布尔值来切换
     *  2 不是服务端渲染
     *  3 当数据对象是数组或者纯对象才进行观测
     *  4 被观测的数据必须是可扩展的 一个普通的对象默认是可扩展的 只有 preventExtensions freeze seal 三个方法使得变为不可扩展
     *  5 isVue 避免被观测的 flag 默认是true
     */
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    // 满足条件之后 new Observer 构造函数
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 * 核心是将数据属性转为访问器属性 为数据属性设置了一对 getter / setter 
 * obj 观测对象 key是对象的属性 val 是属性值
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // dep 用来收集依赖 每一个数据字段都通过闭包引用着属于自己的dep常量
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 如果这个属性值不可配置 则返回
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  // 如果已经定义了getter setter 函数将其取出来 新定义的 getter/setter 中会指向 保证不会覆盖之前已经定义的 getter setter
  const getter = property && property.get
  const setter = property && property.set

  // 开始的版本是 三个参数 但是现在 defineReactive 只有两个参数 只有当满足下面的条件 val才会被赋值 否则就是undefined
  // 当属性原本存在getter拦截器的时候不会深度观测 
  // 第一 当属性原本存在getter时 在深度观测之前不会取值
  // 第二 在深度观测之前不取值是因为属性原本由getter用户定义 避免发生不可预见的问题

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 对象的子对象递归进行 observer 并返回子节点的Observer对象
  // 这里的observe 是用来深度观测数据的。 但是注意一点 val 不一定是有值的 因为要触发上面的条件 val = obj[key]

  /** observe 返回的是什么
  const data = {
    a: {
      b: 1,
      __ob__ : {a, dep, vmCount} // 这个就是childOb
    },
    __ob__: {data, dep, vmCount}
  };
   */
  let childOb = !shallow && observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // getter 函数做了两件事情 一是正确的返回value值 二是收集依赖
    get: function reactiveGetter () {
      // 如果属性存在getter 就返回 getter函数 否则就返回value值
      // 正确的返回属性值
      const value = getter ? getter.call(obj) : val
      // 下面的代码都是收集依赖和子对象收集依赖
      // Dep.target 保存的是要收集的依赖 如果存在就表示有依赖要收集
      if (Dep.target) {
        // 开始进行依赖收集
        dep.depend()
        if (childOb) {
          // 子对象进行依赖收集 子对象的框和上面的框作用不同 触发时机也不同
          // childOb.dep 是第二个框 child.dep === data.a.__ob__.dep 
          childOb.dep.depend()
          // 纯对象和数组的处理方式是不同的
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    // set主要做两件事 一是正确的位属性设置新值 二是能够触发相应的依赖
    set: function reactiveSetter (newVal) {
      // 取得原有的值来比较
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      // 新老值对比 判断NaN 
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      // customSetter 打印辅助信息 第四个参数
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // 判断是否存在setter 如果有就执行setter函数 没有就直接赋值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 如果新赋值的是数组或者纯对象 那么他们是没有被观测的 所以需要对新值重新观测 保证响应式
      childOb = !shallow && observe(newVal)
      // dep对象通知所有的观察者
      dep.notify()
    }
  })
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */

export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&(isUndef(target) || isPrimitive(target))) {
    // warn(Cannot set reactive property on undefined, null, or primitive value: ${(target: any)})
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    // process.env.NODE_ENV !== 'production' && warn(
      // 'Avoid adding reactive properties to a Vue instance or its root $data ' +
      // 'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del (target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    // warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    // process.env.NODE_ENV !== 'production' && warn(
      // 'Avoid deleting properties on a Vue instance or its root $data ' +
      // '- just set it to null.'
    // )
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */

// value [] 
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
