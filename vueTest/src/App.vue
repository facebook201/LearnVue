<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div ref="playContainer"></div>
  </div>
</template>

<script>
import ChimeeMobilePlayer from 'chimee-mobile-player';

export default {
  name: 'app',
  methods: {
    _initPlays() {
      this.play = new ChimeeMobilePlayer({
        wrapper: this.$refs.playContainer,
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        autoplay: true,
        controls: true
      });
    }
  },
  mounted() {
    // this._initPlays();
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
