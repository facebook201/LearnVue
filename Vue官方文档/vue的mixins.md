### mixins 混入

mixins是一种分发Vue组件中可复用功能的非常灵活的方式 混入对象可以包含任意组件选项。当组件使用混入对象 所有混入对象的选项将被混入该组件本身

```javascript
var myMixin = {
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('hello');
        }
	}
};

var component = Vue.extend({
    mixins: [myMixin]
})
```



#### 选项合并

当组件和混入对象含有同名选项时 这些选项将以恰当的方式混入。**对象在内部会进行浅合并, 在和组件的数组发生冲突时以组件数据优先**  

**钩子函数会将混合为一个数组 都会被调用 混入对象的钩子将在组件自身之前调用**

```javascript
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

同名钩子函数将混合为一个数组 混入对象的钩子先执行。

**如果值为对象的选项 methods、components directives 混合为同一个对象 两个对象键名冲突 取组件对象的键值对** 

```javascript
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

值为对象的选项 methods components directives 被混合到一个对象中 两个对象冲突的时候 取组件的属性值



### 相关用法

如果有两个组件有很多相似的函数 但是也有很多的不同 **混合允许你封装一块在应用的其他组件中都可以使用的函数 而且不会改变函数作用域外的东西**

* 模态框和提示框

这两个除了在功能上 没有其他的共同点 看起来不一样 用法不一样 但是逻辑一样

```javascript
// 比如我们定义一个mixins
export default toggle = {
    data() {
        return {
            isShowing: false
        };
    },
    methods: {
        toggleShow() {
            this.isShowing = !this.isShowing;
        }
    }
};

// 下面是引入方式
import Child from './Child';
import {toggle} from './mixins';

export default {
    name: 'modal',
    mixins: [toggle],
    components: {
        appChild: Child
    }
};
```

* 埋点业务

  

```javascript
let cache = null;

export default {
  methods: {
    sendEnterPage() {
      cache = this.$route;
      console.log('enter page', cache);
    },
    sendLeavePage() {
      console.log('leave page', cache);
    }
  },
  mounted() {
    this.sendEnterPage();
  },
  destroyed() {
    this.sendLeavePage();
  }
};
```













