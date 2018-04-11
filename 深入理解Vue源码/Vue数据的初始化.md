#### 初始化数据

```javascript
// 初始化一个根实例 那么这里面Vue都做了一些什么事情
const vm = new Vue({
   el: '#app',
   data: {
   },
   methods: {     
   } 
});
```



##### initMixin(Vue) 初始化 Vue._init() 方法 _init() 用来初始化vue实例

```javascript
function Vue$3(Vue) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    /*初始化*/
    this._init(options)
}

// initMixin(Vue) 在Vue的原型上增加了 _init() 方法
export function () {
    
}
```



