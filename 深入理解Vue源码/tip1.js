
/*! 
 *  Vuejs 2.4.0 源码分析 2018/01/10
 *  初始化部分
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';


// 4277 Vue的构造函数

function Vue$3 (options) {
	if ("development" !== "production" && !(this instanceof Vue$3)) {
		warn('Vue is a constructor and show be call Vue');
	} else {
		// 
		this._init();
	}
}

})));