;(function(win, doc){ 'use strict';

// 注册一个组件
Vue.component('child', {
  template: '<div>I am the {{name}}</div>',
  data: function() {
    return {
      name: 'child'
    }
  }
});

var vm = new Vue({
  el: '#app',
  data: {
    arr: [1, 2, 3],
    name: 'zhangsan'
  },
  computed: {
    time() {
      return Date.now();
    },
    total() {
      return this.name + 'ss';
    }
  },
  watch: {
    name(newVal) {
      console.log(newVal);
    },
    total(newVal) {
      console.log(newVal);
    }
  },
  methods: {
    changeName() {
      this.name = '李四';
    }
  }
});

win.Vue = Vue;
win.vm = vm;

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(arr) {
  var length = arr.length;
  for (var i = 0; i < length; i++) {
      var idx = Math.floor(Math.random() * (length - i));
      var temp = arr[idx];
      arr[idx] = arr[length - i - 1];
      arr[length - i - 1] = temp;
  }
  return arr;
}

console.log(shuffle(arr));


}(this, document, Vue));
