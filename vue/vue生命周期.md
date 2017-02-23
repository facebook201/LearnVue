### Vue的生命周期
官网的图
![border](https://vuefe.cn/images/lifecycle.png)

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

* new Vue() 创建Vue对象。
此时只是创建vue实例 还没有开始监听data。所以el


