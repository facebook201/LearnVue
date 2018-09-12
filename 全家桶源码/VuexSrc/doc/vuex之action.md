####Action

* action 提交的是mutation 而不是直接变更状态
* action 可以包含任意异步操作



```javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    },
    actions: {
        // 这里传context是一个对象 可以调用commit提交mutation 
        increment(context) {
            context.commit('increment');
        }
    }
});
```



实践过程中 我们经常用到ES2015的参数解构 来简化代码 **特别是需要调用commit多次使用的时候**

```javascript
actions: {
    increment({ commit }) {
        commit('increment')
    }
}
```



```javascript
// 看下actions部分的源码
this._actions = Object.create(null);


```

