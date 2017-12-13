// 过滤请求参数
export const queryParm = params => {
  const param = Object.assign({}, params);
  Object.keys(param).forEach(v => {
    if (param[v] === '') {
      delete param[v];
    } else {
      // 中文编码
      param[v] = encodeURIComponent(encodeURIComponent(param[v]));
    }
  });
  return param;
};

// 判断是否已经拥有class
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

// 给dom对象加上一个class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export const ERROR_OK = 200;