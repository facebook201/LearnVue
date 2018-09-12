### mutation

更改Vuex的store的状态的唯一方法是提交mutation。类似于事件。每个mutation 都有一个字符串的 事件类型和回调函数。这个函数就是我们实际更改的地方。需要以相应的type调用 store.commit 方法。

```javascript
mutations: {
    incrememt(state, n) {
        state.count += n;
    }
}

store.commit('increment');

// 可以提交参数 第一个默认state 第二个是额外的参数
store.commit('increment', 10);
```



### Mutation 需要遵守Vue的响应规则

Vuex的store中的状态是响应式的。 那么我们变更状态的时候  监视状态的Vue组件也会更新 mutation也需要与使用Vue一样遵守一些注意事项

* 最好提前在store初始化好所有所需属性

* 当需要在对象上添加新属性时 应该 Vue.set 或者使用对象扩展运算符

  ```javascript
  state.obj = {...state.obj, newProp: 123};
  ```



### 使用常量替代Mutation事件类型

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION';

// store.js

const store = new Vuex.Store({
   state: {...},
   mutations: {
       [SOME_MUTATION](state) {
           // mutate state
       }            
   }
});

```



#### Mutation是同步函数

```javascript
mutations: {
    someMutation(state){
        api.callAsyncMethod(() => {
           state.count++; 
        });
    }
}
```

当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？所以Mutation是同步事务。



### Action

Action类似于mutation 不同在于 

* Action提交的是mutation 不是直接变更
* Action可以包含任意异步操作







