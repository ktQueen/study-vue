import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//定义stroe
// vuex中的状态是响应的
let store = new Vuex.Store({
  state: {
    count: 110  // 定义一个状态
  },
  mutations: {
    updateCount(state, payload) {  // 改变state状态的
      state.count += payload.add;
    }
  }
})

export default store