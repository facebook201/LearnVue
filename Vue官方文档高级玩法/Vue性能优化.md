### 性能瓶颈

在vue里面。app组件下面可能会有很多其他的组件。如果初始化一个父组件 必须要先初始化子组件。而子组件又有自己的子组件。那么要初始化根标签app。 就需要从底层开始冒泡 将页面的所有组件都初始化完 所以页面会在所有组件都初始化完才开始显示。



```html
<app>
  <A></A>
  <B v-if="showB"></B>
  <C v-if="showC"></C>
</app>
```



```javascript
new Vue({
   data() {
       showB: false,
       showC: false
   },
   created() {
       setTimeout(() => {
           this.showB = ture;  
       }, 0);
       setTimeout(() => {
           this.showC = true;  
       }, 0);     
   }
});
```



