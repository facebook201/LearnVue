let vm = new Vue({
    el: '#root',
    components: {
        'componentSlot': childNode
    },
    data() {
        return {
            name: 'zhangsan',
            age: 23,
            arr: [1, 2, 3]
        };
    },
    computed: {
        getMessage() {
            return this.name + this.age;
        }
    }
});


var childNode = {
    name: 'componentSlot',
    //当没有<slot>时，父组件的其他内容不会显示，当有<slot>时，要是父组件中的内容不为空，<slot>
    //中的内容就不会显示
    template: `<div>
    <h2>我是子组件的标题</h2>
    <slot>
    只有在没有要分发的内容时才会显示。
    </slot>
    </div>`,
}