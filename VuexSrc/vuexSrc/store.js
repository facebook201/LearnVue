import applyMixin from './mixin';
import devtoolPlugin from './plugins/devtool';
import MudoleCollection from './module/mudule-collection';
import  { forEachValue, isObject, isPromise, assert } from './util';

let Vue; // 绑定安装Vue

export class Store {
  constructor (options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
    }
  }
}

// 暴露给插件的install方法 供Vue.use调用安装插件

export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        'XXX'
      );
    }
    return;
  }
  Vue = _Vue;
  // 保存Vue 执行applyMixin 混入Vue的beforeCreate中
  applyMixin(Vue);
}
