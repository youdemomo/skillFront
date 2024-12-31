import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    userId: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUserId(state, id) {
      state.userId = id;
    },
  },
  actions: {
    updateAuthentication({ commit }, status) {
      commit('setAuthentication', status);
    },
    updateUserId({ commit }, id) {
      commit('setUserId', id);
    },
  },
  getters: {
    getUserId: (state) => state.userId,
  },
})