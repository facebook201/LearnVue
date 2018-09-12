## 薄弱的知识点 解析

#### render: h => h(App) render函数

```javascript
render(createElement) {
    return createElement(App);
} 
```

![border](https://www.w3cplus.com/sites/default/files/blogs/2018/1804/vue-render-1.jpg)



render函数可以作为一道分割线 左边是**编译期** 将Vue的模板转换为渲染函数 。 render是主要渲染成 虚拟DOM。 DIff 和 Patch

 

#### createElement

第一个参数：{ String | Object | function  } 必要的参数

```javascript
// 第一个参数 字符串 
Vue.component('custom-ele', {
    render: function (createElement) {
    	return createElement('div');
	}
});
// 渲染结果
<div></div>

// 对象
Vue.component('custom-ele', {
    render: function (createElement) {
        return createElement({
            template: `<div>hello world!</div>`
        });
	}
});
```



第二个参数 {Object}

```javascript
render: function(createElement) {
    return createElement('div', {
        'class': {
            foo: true,
            bar: false
        },
        style: {
            color: 'red'
        },
        // 属性
        attr: {
         id: 'boo'   
        },
        domProps: {
            innerHTML: 'Hello Vue'
        }
    })
}
// 渲染出来结果
// <div id="boo" class="foo" style="color: red">hello Vue</div>

// 这里我给出饿了么 row源码的render函数
render(h) {
    return h(this.tag, {
        class: [
            'el-row',
            this.justify !== 'start' ? `is-justify-${this.justify}` : '',
            { 'el-row' : this.type === 'flex' }
        ],
        style: this.style
    }, this.$solts.default);
}
```

第三个参数 代表的是子节点 是一个String或者Array 

饿了么的源码第三个参数是 this.$slots.default 表示该组件下面不是具名插槽的内容。default属性包括了所有没有被包含在具名插槽中的节点。**渲染函数书写组件的时候 vm.\$slots是非常有帮助的**

```javascript
    render(h) {
        return h(this.tag, {
            class: [
                'sy-test',
                this.align ? 'is-align' : '',
                {
                    'is-plain': false,
                    'is-loading': true
                }
            ]
        }, [
            h('div', '我是第三个参数')
        ]);
    }
// 渲染
// <div class="sy-test is-loading"><div>我是第三个参数</div></div>
```

* new Vue，执行初始化

* 挂载$mount 方法，通过自定义 render 方法、template、el 等生成 render函数

* 通过Watcher监听数据的变化

* 当数据发生变化时，render函数执行生成VNode对象

* 通过patch方法，对比新旧VNode对象，通过DOM Diff算法，添加、修改、删除真正的DOM元素

