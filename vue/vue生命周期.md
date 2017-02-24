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
![border](http://images.cnblogs.com/cnblogs_com/fly_dragon/276813/o_lifecycle-%E6%A0%87%E6%B3%A8%E7%89%88%E6%9C%AC.png)
 ���ȴ���vue��ʵ������,Ȼ���ִ��beforeCreated�¼�����,��ʱel��data����undefined����Ϊ��û�м�������
��Ȼ��ʼ��������(Observe Data),���ʱ����Ѿ���data���� Ȼ���ʼ���¼�(init Events)��������ִ��created
�¼����ӡ���ʱ��data����,����û��el��Ȼ���жϴ����ѡ����������Ƿ���el�����û�о͵ȵ�ʵ�����غ���$mount�����ã�
�����ص�vmʵ����������н����ж��Ƿ���ģ�����������оͽ���ģ����벢ִ����Ⱦ������
���ž��ǹ���֮ǰ���������ڹ���beforMount; ��ʱ���˹���el�����ǻ�û������html��ҳ�滹�������� {{ message }}.
���ž��Ǵ��� vm.$el���滻 "el"��Ȼ��mountedִ��,��ʱģ���е�html��Ⱦ��html�ϡ���ʱ������ajax������
����html��htmlҳ����֮�󣬾ͼ������ݱ仯������仯��beforeUpdate()���仯֮��͵���updated() ��һ�����ݱ����ġ�
���������vm.$destroy()ʱ��ʵ���ͻᱻ���١�����ʱbeforeDestroy()�������ӱ�����,ʵ����el������,���ִ��destroyed��
vueʵ�������١�����el �� data���ڡ�

* 1��beforeCreate ��ʱ$el��data ��ֵ��Ϊundefined

* 2������֮�󣬴�ʱ�����õ�data��ֵ������$el����Ϊundefined

* 3��mount֮ǰ��$el��ֵΪ�����⡱��Ԫ�ؽڵ�

* 4��mount֮��mounted֮ǰ�������⡱��dom�ڵ㱻��ʵ��dom�ڵ��滻����������뵽dom���У������ڴ���mountedʱ�����Ի�ȡ��$elΪ��ʵ��domԪ��()

* 5��vm.$el===document.getElementById("app")  // true

* new Vue() ����Vue����
��ʱֻ�Ǵ���vueʵ�� ��û�п�ʼ����data������el �� data ����undefined


