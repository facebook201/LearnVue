#### 程序的结构 来自染陌老师

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606e7eaa2a664e8?imageslim)





#### 初始化及挂载

![border](https://user-gold-cdn.xitu.io/2017/12/19/1606e8abbababbe6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在 new Vue() 之后。Vue 会调用 _init 函数进行初始化。也就是 上面的init过程。他会初始化生成生命周期、事件、props、methods、data、等等。 其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数。 用来实现 **响应式** 以及 **依赖收集** 。 初始化之后会调用 $mount 会挂载组件 如果是运行时编译 不存在 render function 但是存在template 的情况 需要进行编译步骤





- 每一个vue组件 都会默认生成一个uid。且uid不重复 因为他是 ++的操作。
- vue 会对除去根组件的组件进行优化操作 组件里面有一个_isComponent 属性来判断
  - 子组件里面会带一个属性 _componentTag 组件标记。以及父组件的所有信息
- 每个组件都有自己的生命周期 都会去调用vue的相关函数





> 我们先看看源码的实现

```javascript
// 初始化操作
function initMixin (Vue) {
	Vue.prototype._init = function (options) {
		var vm = this;
		vm._uid = uid$1++;
		
		// 初始化 生命周期 事件 render 
		initLifecycle(vm);
		initEvents(vm);
		initRender(vm);
		initRender(vm);
		callHook(vm, 'beforeCreate');
		// 在beforeCreate 之后解决注入 data 和 props 
		initInjections(vm);
		initState(vm);
		initProvide(vm);
		// 在created 之后解决注入 data 和 props 
		callHook(vm, 'created');

		// 如果存在el 则调用$mount
		if (vm.$options.el) {
			vm.$mount(vm.$options.el);
		}
	}
}

// 根据vue来实现类似的构造函数 加深对源码的理解
function Vue3(options) {
	if (!(this instanceof Vue)) {
		warn('Vue is XXX');
	}
	this._init(options);
}

// 初始化操作 数据 属性 方法 props render 等等
initMixin(Vue); // 构造函数里面的_init就是在这里面实现
stateMixin(Vue);
eventMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);    
```



上面就是一些列初始化的操作。在函数里面发现的有意思的点

```javascript
// 初始化入口
// 初始化 生命周期 定义 parent $root $children $refs _watch 
initMixin(Vue$3);
// 数据绑定 $watch $data $props $set $delete 
stateMixin(Vue$3);
// 定义 $on $off $emit $once
eventsMixin(Vue$3);
// 生命周期方法 _update $destory 等
lifecycleMixin(Vue$3);
// 渲染方法 生成 render function 和 VNode
renderMixin(Vue$3);
```



initMixin函数

```javascript
 initLifecycle(vm);
 initEvents(vm);
 initRender(vm);
 callHook(vm, 'beforeCreate');
 initInjections(vm); // resolve injections before data/props	    
 initState(vm);
 initProvide(vm); // resolve provide after data/props	    
 callHook(vm, 'created');
```

接下来看看里面的初始化函数。

```javascript
// initLifecycle 生命周期相关变量的初始化
function initLifeCycle(vm) {
  	var options = vm.$options;

	var parent = options.parent;

	vm.$parent = parent;
	vm.$root = parent ? parent.$root : vm;

	vm.$children = [];
	vm.$refs = {}; // dom节点

	vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}
```









#### 渲染过程

* new Vue 执行初始化
* 挂载$mount 方法 通过自定义Render方法、template、el、等生成 Render 函数
* 通过Watcher监听数据的变化
* 当数据发生变化时  Render函数执行 生成VNode对象
* 通过patch方法 对比新旧VNode对象 通过DOM diff 算法 添加 修改 删除真正的DOM






> 问题
>
> 1 为什么生命周期钩子函数放在数组里面
>
> 