import { Store, install } from './store';
import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers } from './helpers';

// 暴露Vuex对象
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
};
