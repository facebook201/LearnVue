### Vue����������
������ͼ
![border](https://vuefe.cn/images/lifecycle.png)

������һ�����Ľ��ͷ���Vue���������ڡ�Vue��һ����������������,
�ӿ�ʼ��������ʼ�����ݡ�����ģ�塢����Dom����Ⱦ����>���¡���>��Ⱦ��ж��
��һϵ�й��̣�Ҳ����vueʵ���Ӵ��������ٵĹ��̡������������ڡ��һ�
������Vue���������ڵĹ���������el��data���ֱ𿴿�ÿ���׶εı仯
```HTML
<div id="app">
    {{ message }}
</div>
```
```JavaScript
var vm = new Vue({
    el: '#app',
    data: {
	message: "Hello Vue!"
    },
    beforeCreated: function() {
        console.log('beforeCreate ����ִ��...');
        console.log(el);
	console.log(data.message);
    }
});
```

* new Vue() ����Vue����
��ʱֻ�Ǵ���vueʵ�� ��û�п�ʼ����data������el


