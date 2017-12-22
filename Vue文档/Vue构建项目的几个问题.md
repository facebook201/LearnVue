### 1 是否是一个大的SPA应用？

如果有众多的业务线 每个业务线都有独立的一套开发单流程逻辑。是否都是在一个单独的页面中完成？

A：如果业务线复杂 如果整体是一个SPA 那么最终打包的JS会非常大 。虽然可以code spliting 异步加载 但是还是很大。 而且不容易维护。 把相同的业务和有关联的放在一起 最后就是多个SAP构成 页面间的跳转的数据传递通过url传参即可。



### 2 如果实现组件化？

怎么区分业务组件和基础组件？ 怎么把基础组件抽象成一个公共组件库？

A：

基础组件指的是 不包含任何业务逻辑、可以轻松被复用的组件。例如picker、timepicker、toast、dialog、actionsheet等 基础组件的通信就是通过 prop 并监听$emit的事件。



业务组件 指的是 包含业务逻辑、 与后端接口通信的逻辑。 业务组件一般会包含几个基础组件。 我们通过把一些业务逻辑的数据通过vuex 管理起来。 然后组件内部读取数据和提交对数据修改的动作。  **当使用Vuex的时候 并不是所有和后端通信的请求都需要提交一个action。如果这个请求不会修改store的数据 可以在组件内部消化** 



###  3 一个代码仓库有多条业务线时 怎么做到多人同时开发和持续迭代？

比如说一条业务线有一个前端同学开发。如何模块化组织代码 尽可能的减少开发的冲突和持续迭代开发？

为了保证尽量减少代码的冲突，我们按业务线对代码进行了模块划分。由于 Vuex 支持modules，我们很自然地按业务线拆分了 modules，每个 modules 维护自己的 getters、actions、mutaions 和 state。而一些公共数据 如 用户登录状态 作为跟状态。被所有业务共享。



### 4 有的业务线要异步加载 怎么开发这样的业务线 

如何将异步加载的业务线。 怎么使用Vue、Vuex、Store 以及一些公用方法和组件？

可以在window上注册一个XXApp对象。 把Vue、Vuex一些公关组件和方法挂载到这个对象。 这样这些异步加载的业务线就可以通过window.XXApp访问到了。

```javascript
window.XXApp = {
    Vue,
    Vuex,
    store,
    Location // 公共组件
    // 其他方法和组件
};
```



### 5 异步加载的业务组件 如何动态注册？ 

异步加载业务线的js代码。 这些业务线实现的是一个Vue组件 怎么动态注册这些组件？



虽然webpack存在 require.ensure异步加载组件。 但是如果有的代码组件 不是在一个仓库下。 我们需要的是amd的解决方法。 Vue 有一个动态注册组件的API。 Vue.component('async-example', function(resolve, reject){});  在工厂函数里通过resolve方法动态注册组件 这个工厂函数的执行时机是组件实际需要渲染时 那我们渲染这些异步组件的时机就是当我们切换顶部导航到该业务线的时候。

```javascript
Vue.component('async-example', () => {
    import('./my-async-component'); // 异步组件地址
});
```



首先 一条业务线对应一个独立的组件。 业务线有各自的id。 因此 我们先用一个对象去维护这样的映射关系 

```javascript
const modules = {
    业务线id: Taxi, // 出租车
    // 其他同步业务线组件
};

// 这个对象初始化的都是同步业务线组件 对于异步加载的业务线组件。 我们需要动态注册 首先我们在全局的config.js里维护一个业务线的配置关系表。 异步加载的业务会多一个src属性。 

bizConf: {
    异步业务线id: {
        name: 'lif', // 业务线名称
        src: xxx // 加载异步业务组件的js地址
    },
    同步业务线id: {
        name: 'taxi'
    }
  // 其他业务配置
}

// 我们可以遍历这个对象 来异步加载组件

// 获取bizConfig对象
const bizJSConf = config.get('bizConf');

for (let id in bizJSConf) {
    // 保存业务线对象
    let conf = bizJSConf[id];
  
    if (conf.src) {
        modules[id] = conf.name;
        Vue.component(conf.name, (resolve, reject)  => {
           loadScript(conf.src).then(() => {
             resolve(modules[id]);  
           }).catch(() => {
               reject();
           });
        });
    }
}

// 之前说到了渲染这些异步组件的时机就是当我们切换顶部导航栏到该业务线的时候，我们来看看切换顶部导航栏的时候执行了什么逻辑，关键代码如下：

this.currentView = modules[productid];

// 这个 currentView 我们是在 App.vue 的 data 里初始化的，映射到 template 的代码如下
<component :is="currentView"></component>
```



### 6 异步加载的业务线如何动态注册路由





### 7 如何在测试环境下跟后端接口交互  

我们在开发阶段，通常都是在本地调试，本地起的服务域名通常是 localhost:端口号。那么问题来了，这样会和 ajax 请求产生跨域问题，而我们也不能要求服务端把所有 ajax 请求接口都开跨域，如何解决呢？



可以借助 node.js 服务帮我们代理这些接口。我们借助 vue-cli 脚手架帮我们生成一些初始化代码。在 config/index.js 文件中，我们修改 dev 下 proxyTable 的配置

```javascript
proxyTable: {
  '/xxxservice': {
    target: 'http://xxx.com.cn', //你的目标域名
    changeOrigin: true
  },
  //...
}
```





### 8 如何部署到线下测试环境？

我们在本地开发完代码后，需要把代码提测。通常测试拿到代码后，需要部署和测试，那么问题来了，我们如何把本地代码部署到我们的开发机测试环境中呢？



在本地开发完代码后，需要把代码提测。通常测试拿到代码后，需要部署和测试，为此我们写了一个 deploy 的脚本。原理其实很简单，就是利用一个 scp2 的 node 包上传代码，它的执行时机是在 webpack 编译完成后，代码如下：

```javascript
var client = require('scp2')
//...
webpack(webpackConfig, function (err, stats) {
    // ...
	client.scp('deploy/home.html', {
	    host,
	    username,
	    password,
	    path
	  }, function (err) {
	    if (err) {
	      console.log(err)
	    } else {
	      console.log('Finished, the page url is xxx')
	    }
	  })
 })
```









































