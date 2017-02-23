
## MVVM 模式。

![border] (http://cn.vuejs.org/images/mvvm.png?_=5619070)

ViewModel 是 Vue.js的核心。是一个Vue的实例。DOM Listeners和Data Bindings看作两个工具，它们是实现双向绑定的关键
从View侧看，ViewModel中的DOM Listeners工具会帮我们监测页面上DOM元素的变化，如果有变化，则更改Model中的数据；
从Model侧看，当我们更新Model中的数据时，Data Bindings工具会帮我们更新页面中的DOM元素。


