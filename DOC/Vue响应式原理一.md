#### 响应式原理

响应式原理依赖于 Object.defineProperty。 通过设定对象属性的setter/getter方法来监听数据的变化。 通过getter进行依赖收集。每一个setter方法就是一个观察者。在数据变更的时候通知订阅者更新试图。



```javascript
// observe 函数将vue的数据设置成observable的。 当data数据发生改变的时候会
// 触发set 对订阅者进行回调 render 渲染
function observe(value) {
  Object.keys(value).forEach(function(key) => {
    // 监测对象 value
    // 属性值 key
    // 结果值 value[key]
    // 回调渲染函数 cb
    defineReactive(value, key, value[key], cb);
  });
}

function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      /* 收集依赖 */
    },
    set: function() {
      // 订阅者接收到之后的回调
      cb();
    }
  });
}
// 构造函数vue 默认传一个options选项对象
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data, options.render);
  }
}

let app = new Vue({
  el: '#app',
  data: {
    message: 'message'
  },
  render() {
    console.log('render');
  }
});
```

那么如果对app._data.message 操作才会触发set。 那么久需要用到代理



#### 代理

我们可以在Vue的构造函数中为data执行一个代理 把data上面的属性代理到vm实例上。

```javascript
_proxy(options.data); // 构造函数


function _proxy(data){
  const that = this;
  Object.defineProperty(that, key, {
    enumerable: true,
    configurable: true,
    get: function proxyGetter() {
      /* 收集依赖 */
      return that._data[key];
    },
    set: function proxySetter(val) {
      that._data[key] = val;  
      // 订阅者接收到之后的回调
      cb();
    }
  }); 
}
```



#### 问题

* 在defineReactive函数里面 传入vue选项对象的data属性 然后遍历每个值。对其设置getter 和 setter。

  ​

* ​



![border](https://pic4.zhimg.com/80/v2-c5581c68ade5d3503d9791ca1be4010f_hd.jpg)



> 1 实现数据劫持
>
> vue利用的用Object.defineProperty() 对数据进行劫持。 在数据传递变更的时候封装了一层中装站。
>
> 就是我们看到的Dep和watcher两个类







> 2 消息封装 实现中转站
>
> 我们在劫持到数据变更的时候。并进行数据变更通知的时候，如果没有中转站。我们无法知道谁订阅了消息 有多少对象订阅了消息。
>
> Dep 类。 进行依赖收集

```javascript
var Dep = function Dep() {
    // 给每一个订阅者watcher 做唯一标识符 防止重复收集依赖
    this.id = uid++;
    // 定义subs数组 用来收集依赖 收集所有的订阅者
    this.subs = [];
}

// 收集依赖
```



> 2.2 Watcher 观察者
>
> 它负责的是订阅Dep。当Dep 发出消息传递(notify) 的时候。所以订阅者 Dep 的wacther 会进行自己的update操作。

```Javascript

```