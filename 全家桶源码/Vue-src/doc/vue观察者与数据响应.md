#### Dep 和 Watcher

数据响应系统本身的切入点数 initState 函数。 这个函数又在 _init 函数中。 所以 从 **渲染 —> 重新渲染 re-render 的过程探索数据响应系统更深层次的内容**



#### $mount函数

首先对挂载的el做了限制。 不能挂载在 body html 这样的根节点上。（组件挂载本意是组件挂载的占位。body 和 html元素是不能被替换的）如果没有render方法。 则会把el或者 template 字符串转换成render方法。 **在Vue2.0版本 所有的的组件最终都需要render函数来渲染。**

```javascript
// $mount 方法实现
// 组件挂载方法
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  // 获取DOM实例对象
  el = el && inBrowser ? query(el) : undefined
  // 开始挂载组件
  return mountComponent(this, el, hydrating)
}
```





### watcher

Dep类。每个响应式数据的属性都通过闭包引用着一个用来收集自身依赖的筐。这个筐就是Dep类的实例对象。

**pushTarget函数就是为了给Dep.target 属性赋值的。pushTarget函数的参数就是调用该函数的观察者对象。所以Dep.target保存着一个观察者对象 其实这个观察者对象就是即将要收集的目标**

```javascript
// dep 类
function pushTarget(_target) {
    if (Dep.target) targetStack.psuh(Dep.target);
    Dep.target = _target;
}
// watch 类
get() {
    // 这个this就是要收集的目标
    pushTarget(this);
    // ...
    
    popTarget();
    this.cleanupDeps();
}
```



看看cleanupDeps 的源码

```javascript

```



