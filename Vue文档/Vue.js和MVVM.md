
Vue是采用的数据劫持结合观察者模式。通过Object.defineProperty() 来劫持各个属性的 getter、setter方法。 在数据变动时发布消息给订阅者、触发监听回调。

![border](https://segmentfault.com/img/bVBQYu/view)



* 实现一个数据监听器Observer, 能够对数据对象的所有属性进行监听 如果变动可拿到最新值并通知订阅者
* 实现一个指令解析器 Complie 对每个元素节点的指令进行扫描和解析 
* 实现一个Watcher  作为 监听器和解析器的桥梁 能够订阅并收到每个属性变动的通知。 执行指令绑定的相应回调函数 更新视图



### Observer

```javascript
// 实现监听器

function observer(data) {
  if (!data || typeof data !== 'object') {
    return '';
  }
  // 取出所有属性遍历
  Object.keys(data).forEach(function(key){
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  // 监听子属性
  observer(val);
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能define 
    get: function() {
      return val;
    },
    set: function(newVal) {
      console.log('监听值得变化', val, '--->', newVal);
      val = newVal;
    }
  });
}
```



### Vue-detools

第一步： 下载vue-devtools的github项目

Https://github.com/vue/vue-devtools

第二步： 进入到这个项目的目录

cnpm install

**cnpm run build**

第三步：修改 shells > chrome  里面的 mainifest.json 中 的 persistant  true

第四步：把 chromes 拖到 浏览器