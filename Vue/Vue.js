;
(function(win, doc, undefined) {
    'use strict';

    // 实现一个监听器
    function observer(data) {
        // 判断传来的data是不是一个对象
        if (!data || typeof data !== 'object') {
            return '';
        }

        // 取出所有的属性遍历
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        });
    }

    // 
    function defineReactive(obj, key, val, cb) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                console.log(val);
                // 收集依赖
            },
            set: newVal => {
                console.log(newVal);
                cb(); // 订阅者收到消息的回调
            }
        });
    }


    // 定义Vue
    class Vue {
        constructor(options) {
            this._data = options.data;
            observer(this._data);
        }
    }

    // 代理



    win.Vue = Vue;
}(window, document));