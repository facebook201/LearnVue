;(function(win, doc){ 'use strict';

var vm = new Vue({
  el: '#app',
  data: {
    arr: [1, 2, 3],
    name: 'zhangsan'
  },
  methods: {
    changeName() {
      this.name = '李四';
      console.log(this.$refs.name.innerText);
    }
  }
});

// 初始化事件 on emit off once
function initEvent(vm) {
  // 在实例上面创建一个_events 对象 用来存放事件
  vm._events = Object.create(null);
  // 标志位来表明是否存在钩子 而不需要通过哈希表的方法来查找是否有钩子 这边优化性能
  // 初始化父组件atach的事件
  const listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

Vue.use(Vuex);
win.Vue = Vue;

// 异步更新

}(this, document, Vue));
