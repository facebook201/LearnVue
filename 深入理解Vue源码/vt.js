;(function(win){ 'use strict';

	// 注册组件
	var child = {
		template: `<div>我是子组件<span>{{name}}</span></div>`,
		data() {
			return {
				name: 'child'
			}
		}
	};


	new Vue({
		el: '#app',
		components: {
			child
		},
		data: {
			message: 'vue',
			array: []
		},
		methods: {
			add() {
				this.array.push({
					name: '张三',
					value: ''
				})
			},
			print() {
				console.log(this.array);
			}
		}
	});


	Vue = win.Vue;
}(this));


/*! 
 *  Vuejs 2.4.0 源码分析 2018/01/10
 *  初始化部分
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';




// 4146 initMixin (Vue)
function initMixin (Vue) {
	Vue.prototype._init = function (options) {
		var vm = this;

		vm._uid = uid$1++;

		var startTag, endTag;

		// 合并选项 子组件里面会有一个_isComponent属性 为 true
		if (options && options._isComponent) {
			// 用来优化内部组件 动态选项合并很慢 内部组件需要特殊处理
			
		} else {
			// 只有根组件的时候
			vm.$options = mergeOptions(
				resolveConstructorOptions(vm.constructor),
				options || {},
				vm
			);
		}
		vm._self = vm;
		// 定义一些 $parent $children $refs _watch
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    if (vm.$options.el) {
	    	vm.$mount(vm.$options.el);
	    }
	}
}



// 4277 Vue的构造函数

function Vue$3 (options) {
	if ("development" !== "production" && !(this instanceof Vue$3)) {
		warn('Vue is a constructor and show be call Vue');
	} else {
		// 初始化操作
		this._init();
	}
}

// 初始化操作 _init 函数就在里面定义
initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);


})));

