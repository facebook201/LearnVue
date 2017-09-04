* 切换类名 可以根据 真假值来加你想要的类 

  ```javascript
  `<div v-for="item of items" :class="{yet: isYet}">

  </div>`
  // 第一中 这里的 isYet是个布尔值。可以根据真假值来判断是否显示yet

  `<div v-for="item of items" :class="{'active' active==index}" @clicjk="change(index)"></div>`

  return {
    active: 0
  };
  methods: {
    change(index) {
      this.active = index;
    }
  }
  // 切换index的值可以 将当前的类变成active
  ```

  ​

* input 输入框

  ```javascript
  /* 几个事件的区别
   * change事件 在内容改变且失去焦点时触发 
   * input事件 在内容改变时触发
   * keyup事件 在按键释放时触发
   * keydown事件 按键的时候触发
   * foucs事件 聚焦的时候触发
   * bulr事件 失去焦点
   */
  <input v-model.numebr="" @change="change()" @input="change()" @keyup="change()">
  ```

  ​

* ​

