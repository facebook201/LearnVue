#### 为什么使用 Vuex

当我们使用Vue开发的时候 经常会遇到一些组件共享的数据或状态。小规模的时候可以props 事件 父子组件来通信。 但是复杂之后 就导致数据流很混乱。

* 安装

  Vue.use(Vuex);

  ```javascript
  function initUse(Vue) {
    Vue.use = function(plugin) {
          // 检测该插件是否已经被安装
      const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
            return this;
      }
      const args = toArray(arguments, 1);
      args.unshift(this);
     
    }
  }
  ```

  ​

* ​