
/*!
 *  Vuejs 2.4.0 源码分析 2018/01/10
 *  初始化部分
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

// initMixin 初始化 $parent $watch
function initMixin(Vue) {
	Vue.prototype._init = function(options) {
		var vm = this;
		vm._uid = uid$1++;
		var startTag, endTag;
		/* 省略部分代码 */

		// 合并选项 优化子组件
		if (options && options._isComponent) {
			// 优化子组件 在里面设置一些子组件的属性
			initInternalComponent(vm, options);
		} else {
			vm.$options = mergeOptions(
				resolveConstructorOptions(vm.constructor),
				options || {},
				vm
			)
		}

		// 生命周期相关的变量初始化
		initLifecycle(vm);
		// 事件初始化
		initEvents(vm);
		// 渲染
		initRender(vm);
		callHook(vm, 'beforeCreate');
		initInjections(vm); // resolve injections before data/props
		initState(vm);
		initProvide(vm); // resolve provide after data/props
		callHook(vm, 'created');
	}

	// created之后 找挂载点
	if (vm.$options.el) {
		vm.$mount(vm.$options.el);
	}
}

// 2645 生命周期钩子函数
// vue实例 和 钩子名称
function callHook(vm, hook) {
	// 缓存钩子函数
	var handlers = vm.$options[hook];
	if (handlers) {
		for (var i = 0, j = handlers.length; i < j; i++) {
		}
	}
}

// initLifecycle 自己
function initLifecycle(vm) {
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

// 事件监听初始化
function initEvents(vm) {
	vm._events = Object.create(null);
	vm._hasHookEvent = false;

	var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

// 3061 initState 初始化状态
function initState (vm) {
	vm._watchers = [];
}

// 4277 Vue的构造函数
function Vue$3 (options) {
	if ("development" !== "production" && !(this instanceof Vue$3)) {
		warn('Vue is a constructor and show be call Vue');
	} else {
		this._init(options);
	}
}

// 初始化操作
initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

})));
