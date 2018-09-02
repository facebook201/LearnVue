### Vuex源码阅读

阅读源码之前 首先得想明白几个事情

* Vuex 是什么 
* Vuex 是用来干什么 解决什么问题
* Vuex 是怎么实现的 有哪些可以学习的东西 (阅读源码一方面是更好的使用它 二是学习他的思想)





#### Vuex 是什么

是为Vue应用开发的状态管理模式。**主要在于集中管理状态 并以规则保证状态以一种可预测的方式发生变化。**

Vuex的核心是 store。包含应用中大部分的state。但是它跟普通的对象有什么不同？



* Vuex的状态是响应式的 当从Vue中读取状态的时候 若store中的状态发生变化 组件也会更新
* 不能直接改变store里面的状态 唯一的方式是提交mutation