/* @flow */

// 全局环境

// 判断当前浏览器是否支持 __proto__ 这个非标准属性
export const hasProto = '__proto__' in {};

// Browser environment sniffing 浏览器环境嗅探检测
// 是否是浏览器
export const inBrowser = typeof window !== 'undefined'; 

// 如果在浏览器环境 获得它的用户代理信息 判断是否是IE
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();

// 是否是IE
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = UA && UA.indexOf('android') > 0;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// 

