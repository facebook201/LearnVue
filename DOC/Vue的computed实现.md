#### Computed的使用

计算属性用来做复杂的逻辑计算。计算属性和方法的返回值是一样的。 只不过**计算属性是基于他们的依赖进行缓存的。只要相关依赖不发生改变那么就立即返回之前的结果。而不用再次执行函数，如果依赖发生了改变 那么就重新计算**



* 建立与其他属性的联系 （data、Store）
* 属性改变之后 通知计算属性重新计算

实现步骤主要如下：

* 初始化data 使用Object.defineProperty 把这些属性全部转为 getter / setter。

* 初始化computed、computed里面的每个属性。 每个属性都是一个实例 每个属性提供的函数作为属性的getter 视图Object.defineProperty 转化。

* Object.defineProperty getter 依赖收集。用于依赖发生变化时 触发属性重新计算。

* 如果出现当前computed 计算属性嵌套其他computed 计算属性 先进行其他的依赖收集

  ​

#### watch 监听器

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

#### vue怎么处理的

首先在 init初始化vue实例的时候。 会自动执行一个initStat的方法。里面是对 data、props、methods、computed、watch等等的初始化。然后判断options里面是否存在computed属性。

```javascript
function initState(Vue) {
    // ...
    var opts = this.$options;
    if (opts.compunted) {
        // 传入 vm实例和 computed对象
        initComputed(vm, opts.computed);
    }
}

const computedWatcherOptions = { lazy: true };

// initComputed 的实现
function initComputed(vm, computed) {
    const watcher = vm._computedWatcher = Object.create(null);
    
    for (const key in computed) {
        const userDef = computed[key];
        // 计算属性值可能是一个函数 也可能是一个设置set、get的对象
        let getter = typeof userDef === 'function' ? userDef : userDef.get;
        // 如果不存在getter 给出警告
        if (getter === undefined) {
			warn('...');
            // 设置一个空函数
            getter = noop;
        }
        // 给计算属性创建一个内部的监视器 Watcher 保存在实例的_computedWatchers 中
        // 这里的computedWatcherOptions参数传递了一个lazy为true，会使得watch实例的dirty为true
        watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);
        
        // 如果已经定义的计算属性 在现有的组件上则不会再定义
        if (!(key in vm)) {
            // 定义计算属性
            defineComputed(vm, key, userDef);
        } else {
            // 如果存在其他data对象 或者 prop对象 则提示warn
      	  if (key in vm.$data) {
          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      	} else if (vm.$options.props && key in vm.$options.props) {
          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      	}
    }
}
```



#### 如果没有在其他选项对象属性上定义 则定义计算属性

```Javascript
function noop() {}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

function defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
        // 如果计算属性是一个函数 创建计算属性的getter
        sharedPropertyDefinition.get = createComputedGetter(key);
        /*
        当userDef是一个function的时候是不需要setter的，所以这边给它设置成了空函数。
        因为计算属性默认是一个function，只设置getter。
        当需要设置setter的时候，会将计算属性设置成一个对象
        */
        sharedPropertyDefinition.get = noop;
    } else {
        
    }
}

// 创建计算属性的Getter
function createComputedGetter(key) {
    return function computedGetter() {
        
    }
}
```



