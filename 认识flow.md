### flow

flow 是facebook 的静态类型检查工具 主要用来

* 类型推断 通过变量的使用上下文推断出变量类型 根据这些推断来检查类型
* 类型注释 事先注释好期待的类型 Flow会基于这些注释来判断





#### 安装flow

第一步 全局安装flow

npm install -g flow bin  

第二步 在项目下面 初始化flow 创建一个 .flowconfig 

flow init

flowconfig 是对项目进行配置

>[ignore] 忽视对哪些文件进行类型检查
>
>[libs]



在项目下新建一个js文件

```javascript
/* @flow */
function split(str) {
    return str.split('');
}

split(1);
```

参数是一个字符串类型 但是我们传了一个number类型。 然后在项目下 执行 flow命令 会报错。 但是js语言有时候可以让 字符串和数字相加 但是我们不想。所有要加上类型注释。

```javascript
/*@flow*/

function add(x: number, y: number): number {
  return x + y
}

add('Hello', 11); // 检查是否number类型


/*@flow*/
var arr: Array<number> = [1, 2, 3] // 数组类型
arr.push('Hello')



/*@flow*/*@fl 

class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}

/*@flow*/

var foo: ?string = null
```



Vue.js 自定义第三方 在 Vue.js 的主目录下有 `.flowconfig` 文件， 它是 Flow 的配置文件，这其中的 `[libs]` 部分用来描述包含指定库定义的目录，默认是名为 `flow-typed` 的目录。有很多自定义的数据类型





#### Vue和其他工程化的项目 配置flow

* 首先安装依赖

* 配置 flowconfig文件

* 添加 flow check
