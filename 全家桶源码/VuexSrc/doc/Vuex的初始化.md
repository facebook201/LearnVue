#### Vuex的初始化

```javascript
// 当我使用vuex的时候 
import Vuex from 'vuex';

// 实际上引入的是这个对象
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

当我们Vuex.use(Vuex)的时候 先来看看vue 的install方法

```javascript

function initUse(Vue) {
  // Vue 安装插件的方法
  Vue.use = function(plugin) {
    // 是否安装插件 没有就赋一个挂载一个_installedPlugins 属性 为数组
    // 逻辑或操作符 避免重复安装插件
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      // 安装了就直接返回
      return this;
    }
    // 处理额外的参数
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      // 如果插件内部有install 就通过vuex.install 方法调用
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      // 如果插件本身是函数 就直接调用自己
      plugin.apply(null, args);
    }
    // 最后保存起来 判断是否重复
    installedPlugins.push(plugin);
    return this;
  }
}
```

看看Vuexinit 的实现

```javascript
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      // 如果opt存在store 表示是Root根实例
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
       /*子组件直接从父组件中获取store，保证了所有组件都共用全局的同一份store*/
      this.$store = options.parent.$store
    }
  }
```

把optios.store 保存在所有组件的this.$store中。

#### Store实例化

实例化Store对象。返回store实例并传入new Vue的options。

```javascript
export default new Vuex.Store({
   actions,
   getters,
   state,
   mutations,
   modules
   // ...
});

// Store 构造函数接收一个对象参数 actions  getters state mutations modules 等

```



