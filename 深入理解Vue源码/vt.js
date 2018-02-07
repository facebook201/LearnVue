;(function(win){ 'use strict';

	// 注册组件
	var child = {
		template: `<div>我是子组件<span>{{name}}</span></div>`,
		data() {
			return {
				name: 'child'
			}
		},
		created() {
			console.log(2);
		}
	};


	var vm = new Vue({
		el: '#app',
		components: {
			child
		},
		data: {
			message: 'vue',
			array: []
		},
		created() {
			console.log(1);
		},
		beforeMount() {
			console.log(2);
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

	win.vm = vm;
	Vue = win.Vue;
}(this));
