### Vue.set 和 delete



Vue的数据响应式系统的原理的核心是通过 definePrototype 函数将数据对象的属性转换为访问器属性。从而可以拦截属性的读取和设置。Vue是不能拦截到为一个对象 或 数组添加属性。 首先看看 $set 和 \$delete 的实现



```javascript
// Vue.prototype.$set  在 core/instance/state.js

export function stateMixin(Vue: Class<Component>) {
    // ...
    
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

}

// initGlobalAPI
export function initGlobalAPI(Vue: GlobalAPI) {
    Vue.set = set;
    Vue.delete = del;
}
```





