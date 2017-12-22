```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  routes: [
    {
      // 导入路由地址
      path: '/',
      name: 'GoodsList',
      component: GoodList
    },
    // 嵌套路由
    {
      path: '/home',
      component: Home,
      children: [
        {
          // /home/post
          path: 'post',
          component: UserPosts
        }    
      ]
    }
  ]
});
```



### 导航钩子

使用router.beforeEach 注册一个全局的before钩子。 

```javascript
const router = new VueRouter({
  // ...      
});
// 钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中。
router.beforeEach((to, from, next) => {
  // to 即将进入的目标 form 当导航要离开的路由 next 一定要调用该方法来 resolve这个钩子
});
```

可以用来在进入登录页面路由之前 验证用户是否有token, 没有token跳转到登录页面

















