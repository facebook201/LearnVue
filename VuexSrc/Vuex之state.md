####  Store 中的 state

在 store中有个属性叫state。state包含了全部应用的状态 好比是Vue的data。

* **在组件a中修改了state.count 那么其他组件是怎么监听到count的变化的？**

只看store的构造函数constructor 和 state相关的部分，因为 Vuex可以让我们划分多个模块 每个模块都可以有自己的mutations action getter 

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... },
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



所以只看state的代码就是下面这样

```javascript
class Store{
    constructor(option = {}) {
        const { state = {}} = options;
    }
    // installModule 因为一个复杂的Vue应用可以分模块来处理啊
      installModule(this, state, [], options)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state)
}
```