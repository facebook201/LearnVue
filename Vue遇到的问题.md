### Vue 中遇到的问题

 

> 1  v-on 指令 @keyup.enter.native="handleAddTag(index, $event)" 

这里有两个问题 第一个问题。

**如果触发事件的过程中 如果使用内联语句 语句可以使用 $event 属性来访问。**

```vue
<template>
  <div @keyup.enter="@handleAddTag(index, $event)">
    </div>
</template>
<script>
    export default {
        data() {
        },
        methods: {
            handleAddTag(i, eve) {                
            }
        }
    };
</script>
```

**第二个问题 如果同时在input 上使用 enter 事件和 blur事件。当触发ente事件的时候 如果要提交数据 会先触发enter事件 再触发blur事件。如果同时触发两次 就要注意了 **

```vue
<template>
  <el-inpu 
           @keyup.enter="@handleAddTag(index, $event)" 
           @blur="@handleAddTag(index, $event)">
  </el-input>
</template>
<script>
    export default {
        data() {
        },
        methods: {
            handleAddTag(i, eve) {                
            }
        }
    };
</script>
```

