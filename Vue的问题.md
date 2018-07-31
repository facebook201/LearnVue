#### 为什么Vue 无法监听数组



首先length属性无法添加getter 和 setter。无法观察length的变化 以及无法通过索引来修改值。

**数组长度 length**

首先length的 enumberable 和 configurable 都是被设置为false。Vue不能检测数组长度的变化 **准确的说是通过length改变的长度是无法被检测到的**  

所有的数据都是在组件初始化的时候双向绑定的 对于后面新增的是无法检测的 只能手动的去添加。Vue.set()



