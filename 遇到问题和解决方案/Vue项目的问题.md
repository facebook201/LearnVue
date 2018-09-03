#### Vue keep-alive

问题描述: **比如会员的列表分页数据 有筛选条件的时候 回退页面会缓存组件 不调用接口 加载数据 只有手动才会加载数据**

解决方案 **使用keep-alive来缓存需要被缓存的数据 配合路由来实现**

```javascript
// router

{
    path: '/memberlist',
    name: 'memberlist',
   	component: '@/components/memberlist',
    meta: {
      title: 'xxx',
      requiresAuth: true, // 需要权限
      keepAlive: true // 是否缓存
    }
}


// 组件 这里就可以把你想缓存起来的
<keep-alive>
	<router-view v-if="$route.meta.keepAlive" />    
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />    

```

