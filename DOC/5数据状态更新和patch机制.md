#### 1 数据更新视图

对数据进行操作的时候 会触发对应Dep中的Watcher对象。 Watcher对象会调用对应的update来修改视图。 最终是将新的VNode节点与老VNode进行patch比较差异。最终将这些差异更新到视图上。





