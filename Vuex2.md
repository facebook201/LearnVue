#### 创建一个Store

**new Vuex.Store({ …options })** options可以是以下几种

 

State: 存放的状态

actions：注册 actions 异步请求的数据

Mutations：   回调函数处理state

Getter ：注册 getter 处理state 反映在 views



### 创建一个Store

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import goods from './goods';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  module: {
    goods
  }
});
```



#### mutations

Mutations 是一个对象。同actions类似。key 就是mutations的名字、value就是对应的mutation。

mutation用于更新应用的state。

```javascript
// 
export default {
  // state 是 当前模块里面的state data是一个
  [GOODS.GETDOODSLIST](state = {}, data = {}) {
    state.socialLinkList = data.payload.filter(item => !!item.link).map(item => ({
      ..item,
      svgPath: svgPath + '#' + item.name
    }));
  }
};
```







#### Getters 

getters 是一个对象。注册getter 每个getter都是一个function 用于返回一部分的state。getter 方法接受 state 作为第一个参数 。



#### 怎么连接到组件

四个方法 ：mapState、mapMutations、mapGetters、mapActions



来看一个单独模块的store

```javascript
// index.js
// mutation type
const HOME_PAGE = 'HOME_PAGE';
const LOAD_LIST = 'LOAD_LIST';

// actions
export default {
  [HOME_PAHE]({ commit }, options) => {
    // 异步回调
  }
};
```

mapActions 来获取vuex中设定好的action

拿到数据之后 就使用另外两个：mapState 和 mapGetters。同样接收一个数组或对象。根据相应的值将store 中的state 或 getter绑定到组件上。

```javascript
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
    	  
    };
  },
  computed: {
    ...mapState({
      'header',
    }),
    ...mapGetters([
      'postList'
    ])
  },
  methods: {
    // 这里面使用
    ...mapAction([
      'initHomePage'
    ])
  },
  created() {
   this.initHomePage(); 
  }
};
```



