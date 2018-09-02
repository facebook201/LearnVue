export default function (Vue) {
  const version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.minxin({ beforeCreate: vueInit });
  } else {
    const _init = Vue.property._init;
    // 1.0 版本 不处理
  }
}

/**
 * Vuex init hook, injected into each instances init hooks list.
 * Vuex 的init钩子 会存入每个Vue实例的列表
 */

function vuexInit () {
  const options = this.$options
  // store injection
  // 这里的实现也就是为什么大家共用一份store
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
}
