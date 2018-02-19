### 初始化以及挂载

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606e8abbababbe6?imageView2)

在new Vue() 之后。 Vue会调用 _init 函数进行初始化。 也就是这里的init过程。 它会初始化生命周期、事件、props、methods、data、computed与watch 等。最重要的通过Object.defineProperty 设置 setter与getter函数。用来实现**响应式** **依赖收集** 。 这里只要有一个印象即可。 初始化之后调用 $mount 会挂载组件 如果是运行时编译。 即不存在 render function 但是存在 template 的情况 需要进行 **编译** 步骤。

```javascript
new Vue({
   el: '#app',
   router,
   store,
   template: '<App />',
   components: { App }
});
```

 

### 编译阶段

compile 编译可以分成 parse、optimize与generate 三个阶段 最终得到render function

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606ec3d306ab28f?imageView2)

> parse 用正则等方式解析 template 模板

























