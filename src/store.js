import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: "secondary",
    glossy: false,
    darken: true
  },
  mutations: {
    setColor(state, newColor) {
      state.color = newColor;
    },
    setGlossy(state, glossyState) {
      state.glossy = glossyState;
    },
    setDarken(state, darkenState) {
      state.darken = darkenState;
    }
  },
  actions: {
    setColor(context, newColor) {
      context.commit("setColor", newColor);
    },
    setGlossy(context, glossyState) {
      context.commit("setGlossy", glossyState);
    },
    setDarken(context, darkenState) {
      context.commit("setDarken", darkenState);
    }
  },
  getters: {
    getColor(state) {
      return state.color;
    },
    getGlossy(state) {
      return state.glossy;
    },
    getDarken(state) {
      return state.darken;
    },
    getLang() {
      return `pt`;
    }
  }
});
