### 渲染函数和JSX

Vue在大多数情况下推荐使用template模板来创建html。但是在一些场景中 需要javascript 完全编程 就是 render函数。





#### 在Vue中使用jsx 如果你的render函数过于复杂 使用jsx

* 安装babel插件 babel-plugin-transform-vue-jsx 然后在babelrc里面添加

* 在render方法里面写

  ```javascript
  <script>
    export default {
      props: ['isshow'],
      render() {
        return (
          <div class="test" onClick={this.onClick}>
           {this.isshow + 'show'}  
          </div>
        );    
      }
    }
  </script>
  ```




#### 函数式组件 没有this 没有data 有固定的格式和获取数据的方式



