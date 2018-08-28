;(function(win, doc) {

  // @flow
  function Vue$1 (options: Object){
    if (!this instanceof Vue$1) {
      this._init(options);
    }
  }

  Vue$1.prototype.init = function(opt: Object) {
    const vm = this;
    vm._data = vm.opt || {};
    observer(vm._data);
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

  function defineReactive(data: Object, key: string, value: any, showdan? : number) {
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

  let vm = new Vue$1({
    data: {
      name: 'syo',
      age: 24
    }
  });

  console.log(vm);



}(this, document));
