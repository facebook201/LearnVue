#### 1 模板搭建应用

* Vue可以在模板里面使用html，默认把markup放在HTML里。 使用指令(特殊的HTML属性) 用来向模板添加功能。 
* React不使用模板 要求开发者 借助JSX 在JavaScript 中创建DOM。 

 相比 Vue简单容易上手， 但是不容易写出好的代码，如果理解的不深 容易写出垃圾代码。 React更多的需要自己手写很多东西，更多的贴近 使用JavaScript来构建你的应用。



#### 2 简单易用

对于应用数据的处理 ( 就是State )。

React的state是不可变的(immutable)的。所以不能直接改变 需要使用API 中的setState方法。React中通过比较当前state和前一个state来决定何时在DOM中进行重新渲染已经渲染的内容、因此使用需要不可变的state。

Vue的数据是可变的 操作简单

```javascript
// React
this.setState({
  message: this.state.message.split('').reverse().join('');    
});

// Vue
this.message = this.message.split('').reverse().join('');
```

Vue中 当向state添加一个新对象的时候，Vue将遍历其中所有属性并转为getter、setter方法。现在Vue的响应系统开始保持对state的跟踪。 当state中的内容发生变化的时候 就会自动更新DOM。但是Vue有些坑 Vue不能检测属性的添加和删除和某些数组更改 要用到 set 方法。



####如果应用小且块 Vue

React 和 Vue 都将构建一个虚拟DOM 并同步到真实DOM。只是处理不一样。



#### 如果构建一个大型应用 可以使用React

React的immutable应用状态可能写起来不够简洁，但它在大型应用中意义非凡，因为透明度和可测试性在大型项目中变得至关重要。





#### Vuex 和 Redux 的区别（都是用来管理状态的库）



Vuex是一个针对Vue特化的Flux。 主要是为了配合Vue本事的响应式机制。Vuex的接口文档很简单。上手简单，但是Redux 文档比较难懂、不知道怎么拆分reducer、action定义、dispatch怎么做异步。 Ajax怎么使用 



























































































































