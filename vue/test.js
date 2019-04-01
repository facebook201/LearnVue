
const state = require('./store/state');

const store = new Vuex.Store({
	state,
});

const vm = new Vue({
  el: '#app',
  store,
  data: {
    count: 'ss'
	},
	mounted() {
		console.log(this.$store);
	}
});
