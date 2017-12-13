<template>
  <div id="app">
    <div id="wrapper" ref="wrapper">
    </div>
    <div class="touch-area">
      TOUCH
    </div>
  </div>
</template>

<script>
import ChimeeMobilePlayer from 'chimee-mobile-player';
import { userInfo } from '@/api/getData';

export default {
  name: 'app',
  components: {
  },
  methods: {
    init_Video() {
      this.player = new ChimeeMobilePlayer({
        wrapper: this.$refs.wrapper,
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        autopaly: true,
        controls: true
      });
    },
    _getInfo() {
      userInfo().then((res) => {
        console.log(res.data);
      });
    }
  },
  mounted() {
    this.init_Video();
    this._getInfo();
  }
};
</script>

<style scoped="scoped">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.touch-area{
  height: 200px;
  background-color: rgb(64, 158, 255);
}
</style>
