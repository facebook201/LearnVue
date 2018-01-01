# Vue组件编码规范



### 基于模块开发

始终基于模块的方式来构建app 一个模块做一个事情。

* 每一个Vue组件 首先必须专注于解决一个单一的问题。 独立的、可复用的、微小的和可测试的。
* 尽量保证组件大小 保证组件的可独立运行 





### 组件的命名

* 有意义 不过于具体 不过于抽象
* 简短 2-3个单词
* 可读性 便于沟通
* 不能使用保留字 符合自定义元素规范 使用连字符分隔单词



```html
<!-- 推荐 -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- 避免 -->
<btn-group></btn-group>
<Slider></Slider>
```



### 组件props原子化

尽量使用原始类型的数据 尽量只使用(字符串、数字、布尔值)和函数。 尽量避免复杂的对象。

* 使得组件API清晰直观
* 只使用原始类型和函数作为props 使得组件的API 更接近于HTML5原生元素
* 其它开发者更好的理解每一个prop的含义、作用
* 传递过于复杂的对象使得我们不能够清楚知道哪些属性或方法被自定义组件使用 难以维护和重构代码

```html
<range-slider
	:value="[10,20]"
    min="0"
    max="100"
    step="5"
    :on-slide="updateInputs"
    :on-end="updateResults">
</range-slider>
```



### 验证组件的props

在Vue.js中。组件的props即API。 一个稳定并可预测的API会使得你的组件更容易被其他开发者使用。

组件props通过自定义标签的属性来传递。属性的值可以是Vue.js字符串(:attr="value" 或 v-bind:attr="value")或

不传。你需要保证组件的props能应对不同的情况。

* 提供默认值
* 使用type属性效验类型
* 使用props之前先检查该prop是否存在

```vue
<template>
	<input type="range" v-model="value" :max="max" :min="min">
</template>

<script type="text/javascript">
  export default {
    props: {
      max: {
        type: Number, // 这里添加数字类型的效验
        default: 10
      },
      min: {
        type: Number,
        default: 4
      }
    }
  };
</script>
```



### 将this赋值给 component 变量

在vue组件上下文中。 this指向了组件实例 因此你切换到了不同的上下文。要确保this指向一个可用的component变量。



### 组件结构化

按照一定的结构组织 使得组件便于理解

* 导出一个清晰、组织有序的组件，使得代码易于阅读和理解 
* 按首字母排序properties、data、computed、watches和methods使得这些对象内的属性便于查找
* 合理组织 使组件易于阅读



```vue
<template>
  <div class="Ranger_Wrapper">
      <!-- ... -->
  </div>
</template>

<script type="text/javascript">
  export default {
    // 不要忘记name属性
    name: 'RangeSlider',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {
      bar: {}, // 按字母顺序
      foo: {},
      fooBar: {}
    },
    // 变量 
    data() {},]
    // 计算属性
    computed: {},
    // 组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate() {},
    mounted() {}
  };
</script>

<style scoped>
  .Ranger_wrapper{...}
</style>
```







## 组件分类



### 如何分类组件

* view

> view指的是页面。 也可以叫page 和具体的某一条路由对应。 在vue-router配置中指定。view是页面的容器。 是其他组件的入口 可以和vuex store通信。 再把数据分给普通组件。



* global component

>全局组件 作为小工具而存在。例如totas、alert、等。 他的特点是具备全局性, 直接嵌套在root下。
>
>而不属于哪个view。它也可以跟vuex 通信。 单独使用state中的一个module。这个state 中的数据专门来控制global component 的显隐和展示。 不和其他业务实体用到的state 混淆。 其他组件向修改它 可以直接派发相应的mutation。而要监听它的变化。(比如全局的confirm， 确认之后在不同的组件中触发不同的操作) 则使用全局总线 event bus



* Simple component

>简单组件对应的是vue中最传统的组件。 它的交互和数据不多。基本就是一个展示作用。 拆分组件的作用。这种组件和父组件之间通过最传统的方式进行通讯：父组件将props 传入它。通过$emit 触发事件到父组件。 简单组件内部是不写什么业务逻辑的 它可以说是生活不能自理，要展示什么就等着父组件传入 要干什么就$emit 时间出去让父组件干 父组件够操心的



* complex component

>复杂组件 这种组件的特点是。内部包含有很多交互逻辑 常常需要访问接口。 另外 展示数据也比较多

![border](https://user-gold-cdn.xitu.io/2017/12/22/1607d5d47b481aec?imageslim)





图中红色框就是一个复杂组件的实例。 它是一个大列表的列表项。展示的数据很多 而且点击左下角的几个button。 还会弹出相应的弹框。 弹框内有复杂的表单需要填写提交 逻辑很复杂。

* 所有的props 都有父组件一一传入 如果有十几个乃至几十个要展示的数据 那么父组件代码就非常多
* 所有的业务流程都要$emit出去 要父组件处理 那么父组件scriprt 内部的代码可不得上天

所以这样的复杂组件。应该允许有一定的自主权。可以跳过父组件和vuex通信。获取一下state 派发一下mutation和action。 



![border](https://user-gold-cdn.xitu.io/2017/12/22/1607d897d070780a?imageslim)



区分了这四种 component 后，我们在编码时就能做到心里有数，现在在写的组件，到底属于哪一类？每一类以特定的方式编写和交互，逻辑上就会清晰很多。
使用 vue-cli 构建的项目中都会有一个目录叫做 component，以前是一股脑往里塞，现在可以在此基础上再设置几个子目录，放置不同类型的组件。



### 如何优雅的修改 props

假设有一个模态对话框的组件。父组件为了能够打开模态框。 给模态框传入了一个控制其显隐的props。命名为visible，type 为Boolean。绑定模态框外层的v-if指令。那么 如果点击了模态框内部的关闭按钮。 关闭自身 应该怎么写。当然 最传统的方式自然还是模态框抛出事件。 父组件中设置监听 然后修改值。但这种方式无疑有很强的侵入性 无端增加了很多代码量。 **而且子组件不能修改父组件传给你的props。**

#### 方法一

如果不允许修改props的值。 我们怎么修改props呢。我们可以把上面的type设置为对象。 模态框显隐决定于visible.value。 当模态框想要关闭自身。 只需要this.visible.value = false; 即可 这种方式看起来相当方便 但是 编码规范里面说了 props原子化 props里面必须是简单的类型。 

* 使得组件 API 清晰直观。


* 只使用原始类型和函数作为 props 使得组件的 API 更接近于 HTML(5) 原生元素。
* 其它开发者更好的理解每一个 prop 的含义、作用。
* 传递过于复杂的对象使得我们不能够清楚的知道哪些属性或方法被自定义组件使用，这使得代码难以重构和维护。



#### 方法二

vue里面的v-model在表单中可以绑定值。 而实际上v-model是一个语法糖。 v-model="xxx"。相当于:value=“xxx”。 @input="val =>xxx = val"。 我们可以在模态框内部抛出一个input事件 this.$emit('input', false); 就能关闭自身。这种方式比较简洁 也不违反规范 但是容易让人困惑。





#### 方法三 

修饰符。 它本身和v-model 类似的语法糖。 我们要做的 仅仅是在组件内部需要改动值得地方。 抛出一个update事件。this.$emit('update:foo', newValue); 



### 实践封装请求接口

数据是SAP的核心。 而数据的来源都是接口。 如何优雅 高效的通过接口请求数据。

![border](https://user-gold-cdn.xitu.io/2017/12/23/160812ea96ca6815)

- loading 处理。当请求时间比较长时，要跳出全局的 loading 让用户知晓。
- 错误处理。有两种错误，第一种是 http 请求直接返回错误码。第二种，虽然请求的返回值是 200，但是返回结果中提示错误。比如返回的 json 中 `success: false`。对于这两种错误，我们都要捕获并处理。
- api 一致性处理。http client 接受的参数是有讲究的，以 axios为例，get 请求的请求参数为 params，而 post 请求的参数则为 data。对于这种差异，request 这层需要将其抹平，api 层不需要在定义接口时关心这些。





## 实践四：如何决定请求数据的时机

SPA中，每一个 view 中的都有很多数据是需要通过接口请求获得的，如果没有获得，页面中就会有很多空白。上面，我们讨论了如何封装好接口请求，下一步就是决定什么时候请求初始化数据，即，代码在哪里写的问题。实践下来，有两个时机是比较理想的。

### beforeRouteEnter/Update

vue-router 提供了以上两个生命周期钩子，分别会在进入路由和路由改变时触发。这两个钩子是写的 view 中的。

### router.beforeEach

vue-router还提供了一个全局性的 beforeEach 方法，任何一个路由改变时，都会被这个方法拦截，我们可以在这个方法中加入我们自己的代码，做统一处理。比如，对于所有 view 初始化请求的 action，我们可以以特定的名称命名，如以 _init 作为后缀等。在 beforeEach 方法内，我们对当前 view 对应的 store 进行监听，查找到其中以 _init 命名的 action 并派发。
以上两种方式各有特点。
对于前者，优点是数据获取的代码和具体的 view 是绑定在一起的，我们可以在 view 内部就清晰地看到数据获取的流程。缺点是，每增加一个页面，都要在其内部写一堆初始化代码，增加了代码量。
对于后者。优点是，代码统一且规整，使用了配置的方式，写一次即可，不需要每次增加额外的代码。缺点是比较隐晦，且初始化代码和 view 本身割裂了。
对于以上两种方式如何取舍的问题，我倾向于，大型项目用后者，小型项目用前者





### Other Tips

多使用 mixing，能够在组件级别抽离公共部分，减少冗余，极好的机制。

多使用常量，这点和 vue 本身没有关系，但是能极大地提升代码的健壮性。

链接如果是在项目内部跳转，多使用 ，而不是去拼 a 标签的 href。

不要用 dom 操作。但如果迫不得已，比如你要获得某个 dom 的 scrollTop 属性，用 $ref,而不是用选择器去取。

















