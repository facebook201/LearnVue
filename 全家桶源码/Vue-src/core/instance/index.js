
// 从五个文件导入五个方法 初始化
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 执行初始化函数
  this._init(options)
}

// 把Vue作为参数传递给这五个方法

// 在Vue原型上面添加了 _init 方法 内部初始化
initMixin(Vue)

// 处理 $data 和 $props 这两个属性 如果不是生成环境这两个属性无法修改 redad-only
// 这两个属性是只读属性 看里面的实现就知道怎么实现只读属性
stateMixin(Vue)

// 初始化事件 这里添加了 $on $once $off $emit 四个事件方法 
eventsMixin(Vue)

// 添加了 _update $forceUpdate $destory 三个方法
lifecycleMixin(Vue)

// 
renderMixin(Vue)

export default Vue
