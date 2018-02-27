### 响应式系统的依赖收集追踪原理



```javascript
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}

// 响应式原理
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      cb(newVal);
    }
  });
}

// 更新的
function cb(val) {
  console.log('最新的值' + val);
}

function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}


var vm = new Vue({
  el: '#app',
  data: {
    name: 'zhangsan'
  }
});
// 修改值 更新数据 调用cb()
vm._data.name = '李四';
```







> 1 为什么要依赖收集？

* 比如我们的data里面有一个数据被改变了。 但是DOM里面没有用这个数据。 很显然调用更新cb函数是不正确的。

* 如果我们有一个全局对象 我可能会在多个vue对象中用到它进行展示。

  ​

```Javascript
let globalObj = {
    text1: 'text1'
};
let o1 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});
let o2 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});
```



如果你执行了这个操作。 应该要通知两个实例进行更新。 依赖收集会让这个数据知道 有几个地方依赖了他。最终形成的数据和视图的一种对应关系。

![border](https://user-gold-cdn.xitu.io/2018/1/5/160c4572fdd738f2?imageView2)





在observer 的过程中 会注册get方法。 该方法用来进行依赖收集。 在闭包过程中会有一个Dep对象。 这个对象用来存放 Watcher对象的实例。 其实 **依赖收集** 就是把Watcher 实例存到对应的Dep对象中。 get方法可以让当前的Wathcer对象( Dep.target ) 存放到它的subs中。  在数据变化时 set会调用Dep对象notify方法通知它内部所有的Wathcer对象进行视图更新。

这是 Object.defineProperty 的 set/get 方法处理的事情。 **依赖收集有两个前提条件**

* 触发get方法
* 新建一个Watcher对象













