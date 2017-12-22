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

  主要就是定义各种对 state 的状态修改。每个 mutation 函数接收**第一个参数为 state 对象**，其余参数则为一路从组件中触发 action 时传过来的 payload。所有的 mutation 函数必须为**同步**执行，否则无法追踪状态的改动。

* action

  action 主要就是dispatch mutations。来让mutations改变state的东西。 事实上actions的出现是为了弥补mutations无法实现异步操作的缺陷。所有的异步操作都可以放在actions。 

  ```javascript
  function delScene({dispatch}, index) {
      setTimeout(() => {
         dispatch(types.DEL_SCENE, index); 
      }, 1000);
  }
  ```

  触发 mutations 的代码不会在组件中出现，**但 actions 会出现在每个需要它的组件中**，其也是连接组件和 mutations 的桥梁.




```javascript
// 目录结构
store
   --- actions // 模块过多 单独建立文件夹 主要工作就是 dispatch （中文译为分发）mutations。
       --- home // 基本
       --- vip // 会员模块
   --- music // 如果模块过多 单独分开模块 在里面定义 getter mutations 
   --- goods // 模块
       --- state 初始化state
       --- mutations 处理state
   --- index // 导出store
   --- mutation-type.js // 所有放置所有的命名 Mutations 的常量，方便合作开发人员厘清整个 app 包含的 mutations

```



####Store/index.js <store>

```javascript
// index.js
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'; // 所有的dispatch

// 单独的模块
import home from './home';
import member from './member';
import theme from './theme';

Vue.use(vuex);

// 导出Vuex
export default new Vuex.Store({
  actions,
  modules: {
    home,
    member,
    theme
  }
});
```



#### Store/actions/home 单独一个home模块 <action>

```javascript
// 如果进行一些ajax 数据对接 引入一些函数 path 等到
import { query } from '@/util/url'; // 传递参数的功能函数
import axios from '../http'; // axios
import path from '../path'; // api
import { HOME } from '../mutations-type'; // Action 里HOME 模块

// 默认全部导出
export default {
  // 在线机器数量
  [HOME.ONLINEMACHINE]({commit}, options) {
    return new Promise((resolve, reject) => {
      axios.get(`${path.API}/xxx/xxx/xxx`, {
        params: query(options)    
      })
      .then((response) => {
         resolve(response.data);   
      }).catch((error) => {
        reject(error);
        console.log(error);
      });      
    });
  }
};
```



#### store/mutation-typs

```javascript
// 基础相关
export const HOME = {
  DELETE: 'DELETE',
  OPERATOR: 'OPERATOR'
};

export const MEMBER = {
  GETINFO: 'GETINFO',
  DELETEUSER: 'DELETEUSER'
};
```



####store 单独的模块 

```javascript
const state = {
 uid: '',
 token: ''
};

const mutations = {
  goods(state) => {
    const sta = state;
    const n = [];
    sta.music.uid = '';
  }    
};
```

















