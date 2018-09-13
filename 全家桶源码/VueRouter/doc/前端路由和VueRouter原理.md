#### 后端的路由

路由这个概念是后端提出来的。 简单来说就是 **url的分层解析** 根据不同的路径 请求不同的资源 请求不同的页面是路由的其中一种功能

大致流程如下

* 浏览器发出请求
* 服务器监听到 请求过来 解析url路径
* 根据服务器的路由配置 返回相应的信息（可以是html字符串、也可以是JSON数据 图片等）
* 浏览器根据数据包的Content-Type 来决定如何解析数据



#### 前端路由原理

前端路由本质上是监听URL的变化 匹配路由规则 显示相应的页面 目前单页应用只有这两种方式

* hash

www.baidu.com/#/test 就是hash路由。 当#后面的值变化之后不会向服务端发送请求 可以通过haschange 事件监听url的变化。来进行页面跳转

![border](https://user-gold-cdn.xitu.io/2018/7/11/164888109d57995f?imageView2)



* 当hash变化的时候

  * 点击跳转或浏览器历史跳转

    触发hashchange事件 解析url 匹配对应的路由规则 跳转到对应的页面 最后DOM替换的方式更改页面内容

  * 手动刷新

    不会触发hashchange 不会向服务器发送请求 可以通过load事件 来匹配对应的路由规则来跳转

* 



History 模式是 HTML5 新推出的功能 比hash 更加美观。

![border](https://user-gold-cdn.xitu.io/2018/7/11/164888478584a217?imageView2)









#### VueRouter 函数

![border](https://user-gold-cdn.xitu.io/2018/7/27/164da511aeec01c9?imageslim)



