
## MVVM 模式。

![border] (http://cn.vuejs.org/images/mvvm.png?_=5619070)

ViewModel 是 Vue.js的核心。是一个Vue的实例。DOM Listeners和Data Bindings看作两个工具，它们是实现双向绑定的关键
从View侧看，ViewModel中的DOM Listeners工具会帮我们监测页面上DOM元素的变化，如果有变化，则更改Model中的数据；
从Model侧看，当我们更新Model中的数据时，Data Bindings工具会帮我们更新页面中的DOM元素。

```HTML
<div id="app">
    {{ message }}	
    <p>
	{{ myAge }}
    </p>
    <p> {{ name | capitalize }}</p>	
</div>
```


### 计算属性
在做数据的绑定的时候,数据要进行处理之后才能展示到html页面上，虽然vue提供了非常好的表达式绑定的方法，但是只能应对低强度的需求。比如： 把一个日期按照规定格式进行输出，可能就需要我们对日期对象做一些格式化的出来，表达式可能就捉襟见肘了。
Vue对象提供的computed属性，可以让我们开发者在里面可以放置一些方法，协助我们绑定数据操作，这些方法可以跟data中的属性一样用，注意这些方法用的时候不要加()

```JavaScript

var vm = new Vue({
    el: "#app",
    data: {
	message: "Hello Vue",
	year: 1993
    },
    computed: {
	myAge: function(){
	    var date = new Date();
	    return date.getFullYear() - this.year; 
	}    	
    }

});
```
这里通过 当前年份减去我出生的年份来计算出。

### 绑定的数据过滤器
过滤器的本质就是在数据呈现之前先进行过滤器筛选。
```JavaScript
new Vue({
    //...
    filters: {
        capitalize: function(value) {
            if(!value) return ''
	    value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});
```

### 列表渲染

