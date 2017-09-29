* 切换类名 可以根据 真假值来加你想要的类 

  ```javascript
  `<div v-for="item of items" :class="{yet: isYet}">

  </div>`
  // 第一中 这里的 isYet是个布尔值。可以根据真假值来判断是否显示yet

  `<div v-for="item of items" :class="{'active' active==index}" @clicjk="change(index)"></div>`

  return {
    active: 0
  };
  methods: {
    change(index) {
      this.active = index;
    }
  }
  // 切换index的值可以 将当前的类变成active
  ```

  ​

* input 输入框

  ```javascript
  /* 几个事件的区别
   * change事件 在内容改变且失去焦点时触发 
   * input事件 在内容改变时触发
   * keyup事件 在按键释放时触发
   * keydown事件 按键的时候触发
   * foucs事件 聚焦的时候触发
   * bulr事件 失去焦点
   */
  <input v-model.numebr="" @change="change()" @input="change()" @keyup="change()">
  ```

  ​

* Vue的原理深入

  Object.defineProperty  是ES5的一个无法shim的特性。因为在IE8下面已有 而且只能用来处理DOM。所以无法兼容IE8以下的。

  **变化检测的问题**

  通过defineProperty添加的属性值 可以被修改、也可以被删除。新增加的属性值不能检测。Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上

  **异步更新队列**

  Vue **异步**执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会一次推入到队列中。这种在缓冲时去除重复数据(比如我们要改一个名字： vm.name = 'lisi'; 修改了两次 )对于避免不必要的计算和 DOM 操作上非常重要。在下一个的事件循环“tick”中，Vue 刷新队列并执行实际（已去重的）工作。Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MutationObserver`，如果执行环境不支持，会采用 `setTimeout(fn, 0)` 代替。

  为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 `Vue.nextTick(callback)` 。这样回调函数在 DOM 更新完成后就会调用。

  ```Javascript
  // 在组件内部
  methods: {
    updata() {
      this.message = '更新完成';
      console.log(this.$el.message); // {{message}}
      this.nextTick(() => {
        console.log(this.$el.message); // 更新完成    
      });
    } 
  }
  ```

  ​

* ​

