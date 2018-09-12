### Vuex的getter

先看官网的介绍 **Vuex允许我们在store中定义 getter 可以认为是store的计算属性。就像计算属性一样。getter的返回值会根据它的依赖被缓存起来 只有依赖值发生了改变才会被重新计算。**



**getters 接受state作为第一个参数 也可以接受其他getter作为第二个参数** 看看如何使用getter



```javascript
// getter.js
// 返回所有完成的任务
export const doneTodos = state => state.todos.filter(todo => todo.done);

// 使用直接store.getters.doneTodos; // [{id: 1, text: '...', done: true}]

// 其他getter 作为第二个参数
const doneTodosCount = (state, getters) => {
    return getters.doneTodos.length
}
```



**可以通过mapGetters辅助函数 它仅仅是将store中的getter映射到局部计算属性**

```javascript
import { mapGetters } from 'vuex';

export default {
    conputed: {
        // 扩展运算符 将getter混入计算属性中
        ...mapGetters([
           'doneTodosCount',
            'anotherGetter'
        ]);
    }
}

// 如果想将一个getter属性取另一个名字 可以使用键值对的方式
mapGetters: ({
    doneCount: 'doneTodosCount'
})

```

上面就是官网的描述 那我自己抛出几个问题。

* 如果getter是计算属性 那么它是怎么实现的
* 怎么处理传参的
* mapGetters辅助函数怎么实现的 怎么处理参数





#### 第一个问题 怎么实现getters的

vuex把getter当作是store的计算属性。首先从Store里面看起。 从构造函数里面看起

```javascript
constructor (options = {}) {
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], options)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state)
}
```





> 在installModule里面

```javascript
function wrapGetters (store, moduleGetters) {
  Object.keys(moduleGetters).forEach(getterKey => {
    const rawGetter = moduleGetters[getterKey]
    
    // 将 options 里的 getter 赋值到 _wrappedGetters
    // 因为 computed 的赋值就是 return 一个函数
    store._wrappedGetters[getterKey] = function wrappedGetter (store) {
      return rawGetter(
        store.state, // local state
        store.getters, // getters
        store.state // root state
      )
    }
  })
}
```



#### resetStoreVM

```javascript
function resetStoreVM (store, state) {
  // bind store public getters
  store.getters = {}
  
  // 获取刚刚拼接的 _wrappedGetters
  const wrappedGetters = store._wrappedGetters
  
  // 开始拼接 computed
  const computed = {}
  Object.keys(wrappedGetters).forEach(key => {
    const fn = wrappedGetters[key]
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })

  // use a Vue instance to store the state tree
  store._vm = new Vue({
    data: { state },
    computed
  })
}

```

上面拼接一个computed对象 

computed[key] = () => fn(store)

使用 `Object.defineProperty` 对 store.getters 的 get 方法进行重写。这样，一旦访问了 `this.$store.getters.count`，那么 get 方法就会返回 `this.$store._vm.count`，也就是 _vm 的计算属性 count。所以， **store.getters 实际上就是 store._vm 的计算属性 computed**。

