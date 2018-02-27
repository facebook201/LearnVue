### 初始化以及挂载

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606e8abbababbe6?imageView2)

在new Vue() 之后。 Vue会调用 _init 函数进行初始化。 也就是这里的init过程。 它会初始化生命周期、事件、props、methods、data、computed与watch 等。最重要的通过Object.defineProperty 设置 setter与getter函数。用来实现**响应式** **依赖收集** 。 这里只要有一个印象即可。 初始化之后调用 $mount 会挂载组件 如果是运行时编译。 即不存在 render function 但是存在 template 的情况 需要进行 **编译** 步骤。

```javascript
new Vue({
   el: '#app',
   router,
   store,
   template: '<App />',
   components: { App }
});
```

 

### 编译阶段

compile 编译可以分成 parse、optimize与generate 三个阶段 最终得到render function

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606ec3d306ab28f?imageslim)



> parse 用正则等方式解析 template 模板中的指令、class、style等数据 形成 AST(抽象语法树) 指的是源代码语法所对应的树状结构。

![border](http://dl2.iteye.com/upload/attachment/0110/0833/7be2e1f3-c60a-3d85-b265-8856896db6f1.png)

#### optimize

Optimize 的主要作用是标记static 静态节点。这是vue 编译过程中的一处优化。后面当 **update** 更新界面时 有一个pacth 的过程。 diff算法会直接跳过静态节点 从而减少了比较的过程 优化了patch的性能。



### generate

generate 是将AST 转化为render function 字符串过程。得到结果是 render的字符串以及 staticRenderFns字符串。 经历过parse、optimize、与 generate 这三个阶段之后 组件中就会存在渲染VNode 所需要的render function 了。



### 响应式

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606edad5ca9e23d?imageView2)



getter 和 setter 在init的时候 通过 Object.defineProperty 进行绑定。它使得当设置的对象呗读取的时候执行getter函数。被赋值的时候执行 setter 函数。 当 render function 被渲染的时候 会读取所需对象的值 所以会触发 getter 函数进行 **依赖收集** 依赖收集的目的是将观察者Watcher 对象存放到当前闭包中的订阅者 Dep 的subs(**subs**

是一个数组 里面存放这个 watcher)中形成下面的关系。

![border](https://user-gold-cdn.xitu.io/2017/12/21/160770b2a77e084e?imageView2)

在修改对象的值的时候。 会触发对应的setter setter 会通知之前的 依赖收集得到的Dep 中每一个Watcher 告诉他们自己的值改变了。需要重新渲染视图 这时候这些Watcher 就会开始调用update 来更新视图。 这中间还有一个patch 的过程以及使用队列来异步更新的策略。



### Virtual DOM 

render function 会被转化成VNode 节点。 虚拟DOM其实就是一颗 以javascript 对象作为基础的树。 用对象属性来描述节点。 实际上它只是一层对真实DOM的抽象。 最终可以通过一系列操作使得这棵树 映射到真实环境上。

```javascript
{
   tag: 'div',  // 表示是一个div 标签
   children: [  // 存放 该标签的子节点 
     {
       tag: 'a', // a标签
       text: 'click me' // 标签的内容  
     }
   ] 
}

// 最终上面的树 就会转化成
<div>
  <a>click me</a>
</div>
```

上面的只是一个简单的例子。 实际上还有很多属性来标志节点。 比如 isStatic 代表的是是否为静态节点、isComment 代表的是否注释节点等。



### 更新视图 

当一个对象的值改变的时候。 会通过 setter ==> watcher ==> update 的流程来修改对应的视图。

当数据变化后 执行render function 就可以得到一个新的 VNode节点。 我们如果想要得到新的视图 最简单的方法就是直接解析这个新的 VNode 节点。

> patch  是用来比较 新旧 VNode的。 经过diff算法得到差异 最后将这些差异进行修改即可。









