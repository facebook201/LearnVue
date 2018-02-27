首先 我们在修改data之后。 数据修改的过程是

setter ==> Dep ==> Watcher ==> patch ==> 视图。

那么我们为什么要异步更新呢？ **主要考虑到循环多次的情况下。防止DOM被频繁的更新** 

**Vue 在触发某个数据setter方法的时候 相关的Watcher会被push到一个队列queue中。在下一个tick的时候将这个队列里面的全部拿出来patch一遍 **



#### 什么时候更新

```javascript
export default {
    data() {
        return {
            name: '张三'
        };
    },
    methods: {
        changeName() {
            this.name = '李四';
            console.log(this.$refs.name.innerText); // 还是张三
        } 
    }
}
```

上面的值我已经修改了 但是innerText 却没有变。所以去查看源码 **当数据发生响应式变化的时候，setter函数会通知闭包的Dep。Dep 会调用它管理的所有Watcher对象 触发Watcher对象。触发对象的update实现。**

当异步执行update的时候 会调用queueWathcer 函数。 watcher对象会被push到一个队列。此时的状态是wating。这时候会继续有watch对象被push进去。等到下一个tick的时候 才会被遍历取出 更新视图。

```javascript
const nextTick = (function(){
  // 存放异步跟新执行的回调
  const callbacks = [];

  // 一个标记位 如果已经有timeFunc被推送到任务队列中去 则不需要重复推送
  let pending = false;

  let timeFunc;

  function nextTickHandler() {
    pending = false;
    // 执行所有的callbacks
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  /*
   * 异步更新有三种尝试方法 promise、MutationObserver 以及 setTimeOut。
   * 优先使用Promise 如果不支持就使用 MutationObserver。 这两个方法都是微任务 会比
   * setTimeOut 优先执行。现在已经使用MessageChannel 来代替 MutationObserver了。
   * 根据html标准 任务运行完之后UI都重新渲染。 那么在微任务中就完成数据更新。如果新建一个
   * task 就会渲染两次
   */
   if (tyepof Promise !== 'undefined' && isNative(Promise)) {
     var p = Promise.resolve();
     var logError = err => { console.log(err) };

     timeFunc = () => {
       p.then(nextTickHandler).catch(logError);
       if (isIOS) setTimeOut(noop);
     }
   } else if(typeof MutationObserver !== 'undefined' && (isNative(MutationObserver))) {
     //
   } else {
     setTimeout(cb, 0);
   }

}());
```



