##### toArray array-like 转为真的数组

```javascript
// list 类数组对象 
// start开始转换的位置
function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while(i--) {
        ret[i] = list[i + start];
    }
    return ret;
}

Array.prototype.slice.call(arguments, start);
```

