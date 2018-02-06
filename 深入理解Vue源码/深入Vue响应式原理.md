### 深入响应式原理

数据模型是普通的javascript对象。 而当你修改他们的时，试图会进行更新。 这使得状态管理非常简单直接。



### 如何追踪变化

当你把一个普通的Javascript对象传给Vue实例的data选项。 Vue将遍历此对象所有的属性。并使用Object.defineProperty把这些属性全部转给 getter/setter。 每个组件实例都有相应的watch实例对象 它会在组件渲染的过程中把属性记录为依赖 之后当依赖项的setter被调用时。 会通知watcher 重新计算 从而致使它挂念的组件得以更新。

![border](https://cn.vuejs.org/images/data.png)





### 检测变化的注意事项

Vue不能检测到对象属性的添加或删除。 由于Vue会在初始化实例时候对属性指向 getter/setter 转化过程。所以

属性必须在data对象上存在才能让Vue转化它。这样才能让它是响应式的。然而我们可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上

```javascript
//向哪个对象上  添加的属性 和 添加的属性值
this.$set(this.obj, 'key', 2);
```





### 异步更新队列

Vue异步执行DOM更新。 只要观察到数据变化，Vue将开启一个队列。并缓冲在同一事件循环中发生的所有数据改变。 如同一个watcher 被多次触发。只会被推入到队列中一次 这种缓冲去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后下一次事件循环 tick中。 Vue刷新队列并执行实际工作。 Vue内部会尝试对异步队列使用原生Promise.then 和 MessageChannel。如果执行环境不支持 会采用 setTimeout(fn, 0);

当 设置 vm.someData = 'new value'; 该组件不会立即重新渲染 当属性队列时 组件会在事件循环队列清空时的下一个tick更新。 多数情况我们不需要关系这个过程 但是如果你想在DOM状态更新后做点什么。



### Vue是如何把data变成可观察(observale)的

```javascript
// 这里写一个简单版本的 只是针对对象

// 实现一个监听器
function Observer(data) {
  if (!data || typeof data !== 'object') {
    return '';
  }
  // 把传进来的data遍历
  Object.keys(data).forEach(val => {
    defineReactive(data, key, data[key]);
  });
}

// data 要遍历的对象 也就是 Vue的选项对象参数
// key 就是对象的属性 val 就是属性值 cb 是回调 订阅者收到消息后的回调
function defineReactive(data, key, val, cb) {
  Object.defineProperty(data, key {
    enumerable: true,
    configurable: true,
    get: () => {
    	console.log(val);
    	// 收集依赖
  	},
    set: newVal => {
        val = newVal;
        cb();    // 订阅者收到消息的回调
    }
  });
}


// Vue
class Vue{
  constructor(options) {
    this._data = options.data;
    observer(this._data, options.render);
  }
}


```





















