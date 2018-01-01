### JS Event Loop 



js是单线程机制。所以意味着所有的任务都需要排队 前一个任务结束 后一个才会执行。 如果前一个任务耗时很长。后一个任务就不得一直等着。 任务分为两种 同步和异步任务。

* 同步任务

  在**主线程**上排队执行的任务 

* 异步任务

  不进入主线程、而进入**任务队列(task-queue)** 。只有任务队列通知主线程 某个异步任务可以执行了，该任务才会进入主线程执行

**任务队列还分microtask(微任务)和宏任务** 当主线程的任务执行完之后。 那么就会优先执行微任务。其中 Promise 的 resolver、MutationObserver的回调都会被安排到一个新的microtask中执行。 会比setTimeout先执行。



#### 为什么使用microtask？

根据HTML标准。每个task执行完之后。 UI都会重新渲染，那在microtask 中就完成数据更新。 当前task结束就可以得到最新的UI 如果创建一个新task 那么渲染就会进行两次。



#### 看一段代码

```javascript
console.log(1);

// Task 会比微任务还要晚执行
setTimeout(function(){
  console.log(2);
}, 0);

for (let i = 0; i< 1000; i++) {
  i += 1;
}
console.log(6);

// new promise 会立即执行 里面回调会立即执行 resolve是微任务 会等待主线程执行完毕 再执行 优先于宏任务
new Promise(function(resolve, reject){
  console.log(3);
  resolve();
}).then(function(){
  console.log(4);
});

console.log(5);

// 1 6 3 5 4 2
```

