<!-- 输入验证码组件 -->
<template>
  <div class="vcode">
    <input
      ref="vcode"
      id="vcode"
      type="tel"
      maxlength="6"
      v-model="code"
      @focus="focused = true"
      @blur="focused = false"
      :disabled="telDisabled">

      <label
        for="vcode"
        class="line"
        v-for="(item, index) in codeLength"
        :key="item.id"
        :class="{'animated': focused && cursorIndex === index}"
        v-text="codeArr[index]">
      </label>
  </div>
</template>

<script>
export default {
  name: 'vcode',
  data () {
    return {
      code: '', // 验证码内容
      codeLength: 4, // 验证码长度
      telDisabled: false, // 是否输入完
      focused: false // 让input 失去焦点
    };
  },
  computed: {
    // 分隔开数字
    codeArr() {
      return this.code.split('');
    },
    // 光标的位置
    cursorIndex() {
      return this.code.length;
    }
  },
  watch: {
    code(newVal) {
      // 限制非数字的
      this.code = newVal.replace(/[^\d]/g, '');
      if (newVal.length > 3) {
        // 禁用input && 失去焦点 让键盘消失
        this.$refs.vcode.blur();
        setTimeout(() => {
          alert(`vcode: ${this.code}`);
        }, 500);
      }
    }
  }
};
</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
.vcode
  margin-top 20px
  display flex
  justify-content space-between
  align-items center
  position relative
  width 280px
  margin-left: auto
  margin-right: auto
  input
    position absolute
    top: -100%
    left: -666666px
    opacity 0
  .line
    position relative
    width: 40px
    height 32px
    line-height 32px
    text-align center
    font-size 28px
    &:after
      position absolute
      display block
      content ''
      left 0
      bottom 0
      width 100%
      height 1px
      background-color #aaa
      transform scaleY(.5)
      transform-origin 0 100%
  .line.animated
    &:before
      display block
      position absolute
      left 50%
      top 20%
      width 1px
      height 60%
      content: ''
      background-color: #333
      animation-name coruscate
      animation-duration 1s
      animation-iteration-count infinite
/* 验证码动画 */
@keyframes coruscate {
    0% {
      opacity: 0
    }
    25% {
      opacity: 0
    }
    50% {
      opacity: 1
    }
    75% {
      opacity: 1
    }
    to {
      opacity: 0
    }
  }
</style>
