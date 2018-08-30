;(function(win, doc) {

  // @flow
  function Vue (options: Object){
    this._init(options);
  }
  Vue.prototype._init = function(opt? : Object) {
    const vm = this;
    vm.$options = vm._options = opt;
    initState(vm);
  }

  function initState(vm) {
    vm._watcher = [];
    const opt = vm.$options;
    if (opt.data) initData(vm);
  }

  function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = data || {};
    debugger;
    observer(data);
  }

  function observer(value: Object) {
    if (!value || typeof value !== 'object') {
      return;
    }
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i], value[keys[i]]);
    }
  }

  function defineReactive(data: Object, key: string, value: any) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function reactiveGetter() {
        return value;
      },
      set: function reactiveSetter(newVal) {
        if (newVal === value ) return;
        callbackUpdate(newVal);
      }
    });
  }

  function callbackUpdate(newVal) {
    console.log(newVal + '改变更新视图');
  }

  let vm = new Vue({
    data: {
      name: 'syo',
      age: 24
    }
  });

  vm._data.name = 'zhangsan';

  // 父节点
  let obj = {
    attr: 'obj'
    childObj: {
      attr: 'objchild1'
    }
  };

}(this, document));
