/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // 在Vue上添加use 给Vue插件使用
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    // 保存Vue 然后传给插件使用 这样避免可以不用再插件里面单独import Vue了 很厉害的代码
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
