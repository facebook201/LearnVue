### Vue的生命周期
官网的图
![border](https://vuefe.cn/images/lifecycle.png)

![border](http://images.cnblogs.com/cnblogs_com/fly_dragon/276813/o_lifecycle-%E6%A0%87%E6%B3%A8%E7%89%88%E6%9C%AC.png)

* beforecreated：el 和 data 并未初始化 
* created : 完成了 data 数据的初始化，el没有
* beforeMount ：完成了 el 和 data 初始化 
* mounted ：完成挂载

接下来一步步的解释分析Vue的生命周期。Vue有一个完整的生命周期,
从开始创建、初始化数据、编译模板、挂载Dom、渲染——>更新——>渲染、卸载
等一系列过程，也就是vue实例从创建到销毁的过程。就是生命周期。我会
跟随着Vue的生命周期的钩子来监听el和data。分别看看每个阶段的变化
```HTML
<div id="app">
    {{ message }}
</div>
```
```JavaScript
var vm = new Vue({
    el: '#app',
    data: {
	  message: "Hello Vue!"
    },
    beforeCreated: function() {
        console.log('beforeCreate 钩子执行...');
        console.log(el);
	console.log(data.message);
    }
});
```

 首先创建vue的实例对象,然后就执行beforeCreated事件钩子,此时el和data都是undefined。因为还没有监听数据
。然后开始监听数据(Observe Data),这个时候就已经有data数据 然后初始化事件(init Events)。接下来执行created
事件钩子。此时有data数据,但是没有el。然后判断传入的选项对象里面是否有el，如果没有就等到实例挂载函数$mount被调用，
它返回的vm实例本身。如果有接着判断是否有模板参数。如果有就进行模板编译并执行渲染函数。
接着就是挂载之前的生命周期钩子beforMount; 此时有了挂载el，但是还没有生成html到页面还是类似于 {{ message }}.
接着就是创建 vm.$el并替换 "el"。然后mounted执行,此时模板中的html渲染到html上。此时可以做ajax操作。
生成html到html页面中之后，就监听数据变化，如果变化就beforeUpdate()。变化之后就调用updated() 这一步数据被更改。
如果当调用vm.$destroy()时，实例就会被销毁。但此时beforeDestroy()生命钩子被调用,实例和el都存在,最后执行destroyed。
vue实例被销毁。但是el 和 data存在。

* 1、beforeCreate 此时$el、data 的值都为undefined

* 2、创建之后，此时可以拿到data的值，但是$el依旧为undefined

* 3、mount之前，$el的值为“虚拟”的元素节点

* 4、mount之后，mounted之前，“虚拟”的dom节点被真实的dom节点替换，并将其插入到dom树中，于是在触发mounted时，可以获取到$el为真实的dom元素()

* 5、vm.$el===document.getElementById("app")  // true

* new Vue() 创建Vue对象。


### 简化之后的图
![border](http://images2015.cnblogs.com/blog/1064935/201701/1064935-20170103211421987-2119701214.png)
