### Vue 记录所有Vue所使用的知识点 vue-cli vue-router 等等以及配合webpack使用


#### Vue的双向绑定

数据劫持: vue.js则是采用数据劫持结合发布-订阅模式的方式。通过Object.difineProperty()来劫持各个属性的 setter getter,在数据变动时发布消息给订阅者。触发响应的监听回调。要实现MVVM就必须实现下面的几个步骤
* 1实现一个数据监听器 Observer, 能够对数据对象的所有属性进行监听。如有变动可拿到最新值并通知订阅者。
* 2实现一个指令解析器Compile 对每个元素节点的指令进行扫描和解析。根据指令模板替换数据，以及绑定相应更新函数
* 3实现一个Watcher 作为连接Observer和Compile的桥梁。能够订阅并接收到每个属性变动的通知，执行指令绑定的相应回调函数。
* 4MVVM入口函数 整合以上三点

### 访问器属性
访问器属性是对象中的一种特殊属性。它不能直接在对象中设置。而必须通过defineProperty() 方法单独定义。defineProperty会在一个对象上定义一个新属性 或者修改一个已经存在的属性。并返回这个对象。
```JavaScript
var obj = {};
//为obj定义一个名为hello的访问器属性
Object.defineProperty(obj, 'hello',{
	get : function(){
		console.log('get被调用了');
	},
	set: function(val){
		console.log('set被调用了 参数是' + val);
	}
});

obj.hello;	//调用访问器属性的时候会自动调用get方法
obj.hello  = 'abc'; //为访问器属性赋值 就是调用set方法 赋值其实是传参数
```
get 和set内部的this都会指向obj。所以get和set可以操作对象内部的值。访问器属性会覆盖普通属性。因为访问器属性会优先被访问。与其同名的普通属性则会被忽略(也就是所谓的'劫持')


### 极简单的双向绑定原理
```JavaScripr
var obj = {};
Object.defineProperty(obj, 'hello', {
	set: function(newVal){
		document.getElementById('a').value = newVal;
		document.getElementById('b').innerHTML = newVal;
	}
});

document.addEventListener('keyup', function(e){
	obj.hello = e.target.value;
});
```
这就是基本的双向绑定原理。

### 但是我们要实现的是
```CSS
<div id="app">
	<input type="text" v-model="text">
	{{text}}
</div>
```
```JavaScript
var vm = new Vue({
	el : '#app',
	data : {
		text : 'hello world'
	}
});
```
任务分解

* 1 输入框和文本的要与data中的数据绑定
* 2 输入框内容变化时 data中的数据同步变化 view=>model 的变化
* 3 data中的数据变化时 文本节点的内容同步变化。 即model=>view 的变化

#### DocumentFragment
DocumentFragment(文档片段)可以看作节点容器。它可以包含多个子节点。当我们将它插入到DOM中。只有它的节点会插入目标节点。Vue进行编译时。就是讲挂载目标的所有节点劫持到DocumentFragment整体返回插入挂载目标。
