#### 什么是VNode



render function 会被转化车VNode 节点。 虚拟DOM 其实就是一颗javascript对象作为基础的树。用对象属性描述节点。以javascript对象为基础 不依赖平台环境。 可以跨平台。



#### VNode

虚拟DOM就是一个对象。只要在这个类上面加一些属性可以直观的描述当前节点的信息即可。 

如果在运行时编译 不存在渲染函数 存在模板的情况下 需要进行**编译步骤** 

> parse 解析阶段

```html
<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>
```



```javascript
var html = 
    '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';

```

parse 会用正则等方式来将模板进行字符串解析。 得到指令、class 、style等数据。 形成AST

```javascript
{
    /* 标签属性的map，记录了标签上属性 */
    'attrsMap': {
        ':class': 'c',
        'class': 'demo',
        'v-if': 'isShow'
    },
    /* 解析得到的:class */
    'classBinding': 'c',
    /* 标签属性v-if */
    'if': 'isShow',
    /* v-if的条件 */
    'ifConditions': [
        'exp': 'isShow'
    ],
    /* 标签属性class */
    'staticClass': 'demo',
    /* 标签的tag */
    'tag': 'div',
    /* 子标签数组 */
    'children': [
        {
            'attrsMap': {
                'v-for': "item in sz"
            },
            /* for循环的参数 */
            'alias': "item",
            /* for循环的对象 */
            'for': 'sz',
            /* for循环是否已经被处理的标记位 */
            'forProcessed': true,
            'tag': 'span',
            'children': [
                {
                    /* 表达式，_s是一个转字符串的函数 */
                    'expression': '_s(item)',
                    'text': '{{item}}'
                }
            ]
        }
    ]
}
```

















