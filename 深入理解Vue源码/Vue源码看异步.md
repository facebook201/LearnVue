### 操作DOM

有的时候 因为业务需求 不得不去操作DOM。 比如这样

```html
<template>
  <div>
    <div ref="test">
      {{test}}
    </div>
    <button @click="changeValue">
      change
    </button>
  </div>
</template>
```



```javascript
export default {
  data() {
    return {
      test: 'begin'
    };
  },
  methods() {
    changeValue() {
      this.test = 'end';
      console.log(this.$refs.test.innerText);
    }
  }
}
```



查看源码发现。 当某个响应式数据发生变化时 它的setter函数会通知闭包中的Dep，Dep则会调用它管理的所有Watch对象。触发Watch对象的update实现。异步推送到观察者队列中 下一个tick时调用

```javascript
// 将一个观察者对象push进入观察者队列 在队列中已经存在相同id则该观察者对象被跳过 除非是它在队列被刷新是推送

export function queueWatcher(watcher: Watcher) {
  // 获取watcher的id
  const id = watcher.id;
  // 检验id是否存在 已经存在则直接跳过 不存在则标记哈希表has 用于下次检验
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      // 如果没有flush掉 直接push到队列中
      queue.push(watcher);
    } else {
      // if already flushing splice the watcher base on its id
      let i = queue.length - 1;
      while(i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    if (!waiting) {
      wating = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
```

查看queueWatcher的源码我们发现，Watch对象并不是立即更新视图，而是被push进了一个队列queue，此时状态处于waiting的状态，这时候会继续会有Watch对象被push进这个队列queue，等待下一个tick时，这些Watch对象才会被遍历取出，更新视图。同时，id重复的Watcher不会被多次加入到queue中去，因为在最终渲染时，我们只需要关心数据的最终结果



nextTick的实现比较简单，执行的目的是在microtask或者task中推入一个funtion，在当前栈执行完毕（也行还会有一些排在前面的需要执行的任务）以后执行nextTick传入的funtion，



















