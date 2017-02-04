
### 复杂的前端应用暴露的三个问题

* 开发过程中大量调用相同DOM API。处理繁琐 操作冗余 代码难以维护
* 大量DOM操作使得页面渲染性能下降 加载变慢 影响用户体验
* 当 Model频繁发生变化。开发者需要主动更新到View; 当用户的操作导致Model变化时。
  开发者同样需要将变化的数据同步到Model中, 这样的工作不仅繁琐 而且难以维护复杂多变的数据状态。


### MVVM
* MVVM 由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，
  也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，
  它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。
* 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，
  Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，
  而Model 数据的变化也会立即反应到View 上。
* ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的
  同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 
  不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

### Vue.js的细节
Vue.js采用 Object.defineProperty 的 getter和 setter。结合观察者模式来实现数据绑定。
把一个普通的JavaScript对象传给Vue实例来作为它的 data选项。
Vue将遍历它的属性 用Object.defineProperty将他们转为 getter/setter。

![border] (http://images2015.cnblogs.com/blog/849589/201611/849589-20161106211631549-2019592745.png)
 
* Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。

* Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

* Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

* Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。



