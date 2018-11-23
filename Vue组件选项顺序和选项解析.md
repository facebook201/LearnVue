### Vue 组件选项的顺序



> mixins





> name 组件的名称 注册的时候可以用到 名称最好使用W3C的规范 小写字母加连字符

```javascript
export default {
    name: 'components-name'
};

// 全局注册的时候
Vue.component(component.name, component);
```



> inject



> provide



> computed



> components



> directives



> props 父组件向子组件传值

所有的prop都使得父子prop之间形成了一个单向下行绑定； 父级prop的更新会向下流动到子组件中。**父组件里面的prop改变都会刷新为最新的值。这意味着你不应该在一个子组件内部改变prop。**

两种尝试改变prop的情况。

* **1 prop用来传递一个初始值。这个子组件希望将其作为一个本地的数据来使用。 这种最好定义本地的data属性并且将这个prop用作其初始值。**

  ```javascript
  props: ['initialCounter'],
  data: function() {
    return {
      counter: this.initialCounter
    }
  }
  ```

* **2 以原始值传入且需要装换 这种最好用props的值来定义一个计算属性**

  ```javascript
  props: ['size'],
  computed: {
    normalizedSize: function() {
      return this.size.trim().toLowerCaser();
    }
  }
  ```

  注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身**将会**影响到父组件的状态。


> data





> watch



> methods



> lifecycle hooks







































