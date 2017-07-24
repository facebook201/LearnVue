## Vue官方文档之Vue实例

#### 属性和方法
每个实例都会代理其Data对象里所有的属性：

**这些被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。如果在实例创建之后添加的新属性到实例上。不会触发视图更新**。

```javascript
// 举个例子

data() {
  return {
    lists: [], // 用来保存ajax请求到的数据
  };
}
// ajax 获取数据之后
if (res.result === 0) {
  // 1
  this.lists = res.detail.data;
  this.lists.map((v) => {
    const val = v;
    val.info = ''; // 赋值完毕之后再添加新的属性之后不能被监听到。
    return val;
  });
}
// 上面的方式不能被vue监听到 解决方案有两个

// 第一 直接在返回的对象数据里面先改再赋值
this.lists = res.detail.data.map((v) => {
  const val = v;
  val.info = '';
  return val;
});

// 第二 Vue.set (target, key, value)
// {Object | Array} target,  {string | number} key { value } any
Vue.set(this.lists, info, '');


```

