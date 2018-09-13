/**
 * VueRouter 解析 
 **/

// 一 路由注册 让插件可以使用Vue

export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Oject) {
    // 判断重复安装插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    const args = toArray(arguments, 1);

    // 插入Vue
    args.unshift(this);

    // 一般在插件内部都有个install函数 这个函数可以让插件使用Vue
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if(typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    // 安装插件之后 存放起来 避免重复安装
    installedPlugins.push(plugin);
    return this;
  }
}


// 二 install 函数的部分
export let _Vue;

export function install(Vue) {
  // 确保install调用一次
  if (install.installed && _Vue === Vue) return;
  install.installed = true;

  // 保存Vue实例
  _Vue = Vue;

  const isDef = v => v !== undefined;

  /* 通过registerRouterInstance 方法注册router实例 */
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouterInstance)) {
      i(vm, callVal);
    }
  }

  // 混入 Vue实例 在beforeCreate 与 destroyed钩子上混淆 首先执行mixin的钩子函数
  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        /** 在option上面存在router代表的是根组件 保存根组件vm */
        this._routerRoot = this;
        // 保存router
        this._router = this.$options.router;
        // VueRouter 对象的init方法
        this._router.init(this);
        // Vue 内部方法 为对象definePropperty 上在变化时通知的属性
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        // router-view 层级判断
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destory() {
      registerInstance(this);
    }
  });

  //在Vue原型上绑定$router 这样就可以在任意的vue对象中使用this.$router 访问。
  // 同时经过Object.defineProperty 访问this.$router 即方法this._routerRoot._router
  Object.defineProperty(Vue.prototype, '$router', {
    get() { return this._routerRoot._router; }
  });

  // 同上
  Object.defineProperty(Vue.prototype, '$route', {
    get() { return this._routerRoot._route; }
  });

  // 全局注册组件 router-link 和 router-view
  Vue.component('RouterView', View);
  Vue.component('RouterLink', link);
}
