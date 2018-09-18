// 首先要监听一个属性的变化

Object.definePrototype(data, 'a', {
  set() {
    console.log('设置了属性a');
  },
  get() {
    console.log('读取了属性a');
  }
});

/**
 * 定义一个框 来收集依赖
 */

const sub = [];

Object.definePrototype(data, 'a', {
  set() {
    // 循环执行依赖
    sub.forEach(fn => {
      fn();
    });
    console.log('设置了属性a');
  },
  get() {
    // 收集依赖
    sub.push(fn);
    console.log('读取了属性a');
  }
});