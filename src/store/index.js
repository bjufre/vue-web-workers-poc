import Vue from "vue";
import Vuex from "vuex";
import api from "../helpers/api";

Vue.use(Vuex);

// Types
const SET_ERROR = "@@poc/SET_ERROR";
const SET_USERS = "@@poc/SET_USERS";
const UPDATE_USER = "@@poc/UPDATE_USER";

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    [SET_USERS](state, users) {
      state.users = users;
    },
    [SET_ERROR](state, errorMessage) {
      state.error = errorMessage;
    },
    [UPDATE_USER](state, user) {
      const userIndex = state.users.findIndex(u => u.id === user.id);
      if (userIndex >= 0) {
        Vue.set(state.users, userIndex, user);
      }
    }
  },
  actions: {
    fetchUsers({ commit }) {
      return api
        .get("/users")
        .then(({ users }) => commit(SET_USERS, users))
        .catch(error => {
          console.log("FETCH ERROR: ", error);
          commit(SET_ERROR, error);
        });
    },
    updateUser({ commit }, user) {
      commit(UPDATE_USER, user);
    }
  }
});
