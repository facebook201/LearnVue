# Vuex
Vuex的理解和学习 以两个案例 来学习和理解Vuex的项目结构和每个文件的意义


### 首先说一下整个vuex

* 首先是dispatch分发 触发view中的视图。然后
* 通过commit发出一个请求改变 事件。 actions 写请求函数 然后
* mutations 执行具体操作 state的改变（都在 module里面） 然后
* state 把改变的通过getters传给view 改变后关联到view

dispacth ===> actions ===> mutations ===> state ===> getter ===> view

* state 单一状态树
  他就是一个对象 包含你所需要的应用状态。当然你首先要对去其进行一个初始化
  Vuex 通过store选项。从根组件 注入到每一个子组件中。 需要调用Vue.use(Vuex)。其实 就是new Vue()传入store。前面代码已经有就不重复贴。

* Getters 
  可以理解Getters为store的计算属性。通过Getters 可以对Store中state做处理、Getters 接受state作为其第一个参数
  在组件中获取Vuex的状态 在计算属性中通过mapGetter 将store中的getters映射到局部计算属性。

* Mutations 
 * 更改vuex的store中state的唯一方法就是提交 commit
 * 每个mutation都有一个字符串的事件类型( mutations-type ) 和 一个回调函数。 在回调函数中处理state。
 * 使用常量 替代Mutation事件类型。最好就是把这个常量单独放在一个文件中统一管理 例如 mutations-type.js 


* Action 
  * action 包含任意异步操作
  * action里面实际执行的是提交 mutation
  * 通过store.dispatch 分发 actions
  * action 同样支持载荷方式和对象方式进行分发

* mudules 
  Vuex 可以把 store 分割成模块。 每个模块都有自己的state mutation action getter 这样更方便管理。


![border](https://user-gold-cdn.xitu.io/2017/6/7/ff5e2823faddef4b7ee6ae840c58bd92)

```javascript

1 State 渲染Vue组件（视图）
2 Vue组件 与用户交互过程中分发(dispatch) Actions
3 Actions 执行相应的回调 commit(type)
4 触发Mutations的事件 更改 store中State
5 State发生变化。重新刷新视图Vue组件
6 Actions在与后台API进行HTTP交互时候触发
7 Devtools 一个Vue的官方调试工具

```

### 项目目录结构分析

|-- store　　　　 # Vuex的根目录
  |-- actions    # actions 完成数据请求 做好异步处理 可以将ajax放在这里面 
    |-- home     # 可以划分更小的模块 来细分 数据请求
    |-- user
    |-- goods
    index.js
    path.js
  
	|-- modules　　 #可以理解为该文件夹下每个js模块就是一个store　
	  |-- user.js  #demo: 用户登陆后的信息模块 这里面初始化 state getters mutations定义各种对state的状态修改
  
	|-- index.js  # 对外导出store
	
  |-- mutation-types.js	#抽离出来的存放各种 mutation 事件类型的模块 方便开发人员理清楚整个App的mutations
  
  |-- member    # 公共变量
      index.js  # 里面初始化全局的 uid shopid 等必穿参数 默认参数 给actions接口调用



#### 组件绑定的辅助函数

* mapState 创建组件的计算属性返回Vuex store 中的状态。

* mapGetters 创建组件的计算属性返回getter的返回值 仅仅是将store 中的 getter映射到局部计算属性

```javascript

// 我们可以在模块下面这样写

const getter = {
    // state 就是 这个模块下面的变量 通过getter处理返回一个值
    // goods_nav 在组件中通过mapGetters 计算属性使用
    goods_nav: (state) => {
    const sta = state;
    const n = [];
    n.push({ isActive: true, name: '全部' });
    sta.goods.forEach((v) => {
      v.tag.forEach((t) => {
        n.push({
          isActive: false, name: t,
        });
      });
    });
    return unique(n, 'name');
  },
};

// 然后在组件中这样使用

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'goods_nav'
    ]),
  }
};

```

* mapActions 创建组件方法分发action

