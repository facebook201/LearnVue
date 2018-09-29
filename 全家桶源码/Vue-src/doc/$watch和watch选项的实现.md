#### watch选项的实现



```javascript
  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    // 一般第二个参数传一个函数 例如 function(newVal, val){  }
    // 也可以穿一个对象 里面包含handler属性 属性值作为回调
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    // 如果是回调函数
    options = options || {}
    options.user = true
    // 创建一个Watcher实例对象
    const watcher = new Watcher(vm, expOrFn, cb, options)
    // immediate选项用来在属性或函数被侦听后立即执行回调 
    // 如果 immediate 为真
    if (options.immediate) {
      // watcher.value 是 watch处理之后 this.getter() 返回的值 也就是被观察属性的值
      cb.call(vm, watcher.value)
    }
    // 返回一个函数 这个函数如果执行就解除当前观察者对属性的观察 它的原理是通过调用观察者实例对象
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}
```



看看最后wathcer.teardown 是如果解除观察者与属性之间的关系的。

```javascript
 teardown () {
    // 检查该观察者是否处于激活状态 默认是激活状态 当属性和观察者解除这个关系之后 会赋值false
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      // _isBeingDestroyed 是一个标识。 为真的时候说明该组件实例被销毁
      if (!this.vm._isBeingDestroyed) {
        // 如果组件没有被销毁 就将_watchers 从
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }

```



#### 如果第二个参数是一个对象

```javascript
watch: {
    c: {
        handle: function(val, oldVal) {},
        deep: true
    }
}
```

