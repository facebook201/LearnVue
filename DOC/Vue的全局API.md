#### use

Vue.use(plugin); 

* {object | Function } plugin 
* 安装插件 如果插件是一个对象 必须提供install 方法。



```javascript
// 初始化use
export function initUse(Vue: GlobalAPI) {
  // 参数是一个对象
  Vue.use = function (plugin: Function | Object) {
    
  }   
}
```

