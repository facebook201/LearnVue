#### Vue源码正式开始

**学习源码的目的是为了更好的知道实现机制 深入理解。当在实际开发中遇到问题时候 能更好的理解问题 解决问题 准备从以下几个方面学习Vue**

* **Vue的运行机制**

  * 初始化及挂载

    * data的初始化
    * 

  * 编译过程

    * parse 解析模板形成AST
    * optimize 优化过程 标记静态节点 有个patch过程 diff算法 较少比较 优化性能
    * Generate AST转成 render函数 

  * 响应式

    * get
    * set
    * 依赖收集

  * 虚拟DOM

  * 更新视图

* 学习源码里面好的工具函数 和 写法

  * 工具函数 cached 缓存函数





* 学习作者的思路 以及优雅的API





#### vue 构造函数

在 core/instance/index 里

```javascript
// // 定义 Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 执行初始化函数
  this._init(options)
}

// 初始化五个方法

export default Vue;
```







