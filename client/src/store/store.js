import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    userData: {},
  },
  getters: {
    loading(state) {
      return state.loading
    },
    userData(state) {
      return state.userData
    },
  },
  mutations: {
    loading(state, status) {
      state.loading = status;
    },
    userData(state, data) {
      state.userData = data;
    }
  },
  actions: {},
})