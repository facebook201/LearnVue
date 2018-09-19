#### Vue数组为什么没办法被监测变动？



首先贴一张官网的图。

![border](https://github.com/facebook201/LearnVue/blob/master/%E5%85%A8%E5%AE%B6%E6%A1%B6%E6%BA%90%E7%A0%81/Vue-src/img/arr.png)

JS 本身是可以支持响应式数组的。但是它的length属性值不能的。因为它自己本身的configurable是false。是无法配置的。但是数组的索引支持响应式。那么为什么Vue通过变相通过方法处理数组呢。

**那是因为数组在js中常被当做栈 队列 集合 等数据结构。储存批量的数据来遍历。所以单独拿出来处理是为了性能。**  Vue在数组上定义 \__ob\__ 替换了push 等能够影响原数组的原型方法。 它跳过了对每个键设置响应式的过程 而是直接对值进行递归设置响应式。

```javascript
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
```

通过拦截重写数组的方法来实现。主要是新增的方法 也提供了一个set方法来实现。

而且在issues上买找到尤大大的回答
![border](https://github.com/facebook201/LearnVue/blob/master/%E5%85%A8%E5%AE%B6%E6%A1%B6%E6%BA%90%E7%A0%81/Vue-src/img/length.png)

