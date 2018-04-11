#### 常用的排序

```javascript
function shuffle(arr) {
    return arr.sort(() => {
        return Math.random - 0.5;
    });
}
```

上面的代码看似实现了排序功能。 其实有很大的错误。



#### 证明错误

证明一个东西的错误 最好的方式是经过大量的数据来验证。 所以我们可以将[0,…,9] 这10个数字经过多次的打乱。

最后对每一位取平均值 。平均值应该是4.5 测试的次数越多 表示越接近平均值

```javascript
// 定义一个带排序的数组 一个测试平均值的数组
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var test = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 重复次数
var l = 10000;

for (let i = 0; i < l; i++) {
    var sorted = shuffle(arr.silce(0));
    sorted.forEach((val, i) => {
        // 把每次排玩之后出现的值 累加起来 最后除以 l 得到平均值
        test[i] += val;
    });
}

test = test.map((val) => {
   return val / l 
});

console.log(test);
```

这样就得到了 平均出现的次数了。结果发现 越大的数字出现在后面的概率越大。 为什么会这样？

* 冒泡排序

冒泡排序总是将比较结果较小的元素与它的前一个元素交换，我们可以大约思考一下，这个算法越后面的元素，交换到越前的位置的概率越小（因为每次只有50%几率“冒泡”），原始数组是顺序从小到大排序的，因此测试平均值的结果自然就是越往后的越大（因为越靠后的大数出现在前面的概率越小）。

* 插入排序

由于插入排序找后面的大数与前面的数进行交换，这一次的结果和冒泡排序相反，测试平均值的结果自然就是越往后越小。原因也和上面类似，对于插入排序，越往后的数字越容易随机交换到前面。

所以我们看到即使是两两交换的排序算法，随机分布差别也是比较大。除了每个位置两两都比较一次的这种排序算法外，大多数排序算法的时间复杂度介于 O(n) 到 O(n2) 之间，元素之间的比较次数通常情况下要远小于 n(n-1)/2，也就意味着有一些元素之间根本就没机会相比较（也就没有了随机交换的可能），这些 sort 随机排序的算法自然也不能真正随机。



#### 经典的随机排序

所有的空间复杂度O(1) 的排序算法的时间复杂度都是介于O(nlogn) 到 O(n^2) 之间。 因此不在考虑算法结果错误的前提下。 使用排序来随机交换也是慢的。

算法思路

每一次循环从前 len - i 个元素里面随机一个位置。将这个元素和 第 len - i 个元素进行交换。迭代直到 i = len - 1 为止。

![border](https://dn-h5jun.qbox.me/matrix/FZ_RKpdgCBeik-I6RWz1eSXT.png) 

![border](https://dn-h5jun.qbox.me/matrix/0uFHhTQ-KsMF9y_29uMmun5r.png)

```javascript
function shuffle(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        var temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}
```

上面的算法证明是均匀分部的。也可以通过数学归纳法来证明。