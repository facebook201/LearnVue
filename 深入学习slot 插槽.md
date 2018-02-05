#### Vue 之插槽 slot



插槽 是组件的一块HTML模板。这块模板**显示不显示以及怎么显示由父组件来决定**。 是组件的一块HTML模板。

但是插槽显示的位置确由子组件自身决定。 slot写在组件template的什么位置 父组件传过来的模板将来就显示在什么位置。



##### 单个插槽| 默认插槽

单个插槽是官网的叫法。 也可以叫匿名插槽。 因为它不用设置name属性。 一个组件里只能有一个该类型的插槽。 具名插槽就可以有很多个。 只要名字不同就可以。

> 父组件

```html
<template>
    <div class="father">
        <h3>这里是父组件</h3>
        <child>
            <div class="tmpl">
              <span>菜单1</span>
              <span>菜单2</span>
              <span>菜单3</span>
              <span>菜单4</span>
              <span>菜单5</span>
              <span>菜单6</span>
            </div>
        </child>
    </div>
</template>

```

> 子组件

```html
<template>
    <div class="child">
        <h3>这里是子组件</h3>
        <slot></slot>
    </div>
</template>
```





#### 具名插槽 

匿名插槽 没有name属性。具名插槽可以出现n次。 出现在不同的位置 

```html
<teamplate>
  <div class="child">
    // 具名插槽
    <solt name="up"></solt>
    // 匿名插槽
    <solt></solt>
  </div>
</teamplate>
```



#### 作用域插槽 | 带数据的插槽

作用域插槽的意思就是 带数据的插槽。要在solt里绑定数据。

```vue
<solt name="up" :data="data"></solt>
<script>
  export default {
    data() {
      return {
        data: ['张三', '李四', '王二']    
      };    
    }    
  };
</script>
```



插槽最后显示不显示是看父组件有没有在child下面写模板。  作用域插槽绑定了一套数据。父组件可以拿来使用。

这样的情况 样式父组件说了算。 内容可以显示子组件插槽绑定的。作用域插槽，父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下

#### 子组件

```vue
<template>
  <div class="child">
    <h2>这里是子组件</h2>
    <slot :data="data"></slot>
  </div>
</template>

<script>
export default{
  data () {
    return {
      data: ['张三', '李四', '王二']
    }
  }
}
</script>
```



#### 父组件

```vue
<div class="father">
    <h3>这里是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <child>
      <template slot-scope="user">
        <div class="tmpl">
          <span v-for="item in user.data">{{item}}</span>
        </div>
      </template>
    </child>
</div>

```



