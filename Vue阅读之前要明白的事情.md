#### Flow 类型检测

* 类型推断：通过变量的使用上下午推断出变量类型 然后根据这些推断来检测类型
* 类型注释：事先注释好我们期待的类型 Flow会基于这些注释来判断





### 对象

* 创建对象
  * 字面量
  * Object.create({})
  * Object.crete(null)



Object.create 用来创建一个新对象 使用现有对象来提供新创建对象的 __ proto __。

```javascript
if (!Object.create) {
    Object.create = function(o) {
        function F () {};
        o = F.prototype;
        return new F();
    }
}
```



```javascript
let obj = { a: 1};
// 字面量创建对象 obj 的原型就是 Object

let obj1 = Object.create({a: 1});
// 继承{a: 1} 创建一个对象

let obj2 = Object.create(null);

```

上面三种的图解如下

![border](https://user-gold-cdn.xitu.io/2018/7/15/1649c4e3e74b0cc5?imageView2)



Vue里面使用Object.create(null) 创建对象。好处是不用担心这样属性和其他对象的属性重名

