import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: 'primary',
    glossy: true
  },
  mutations: {
    setColor(state, newColor){
      state.color = newColor
    },
    setGlossy(state, glossyState){
      state.glossy = glossyState
    }
  },
  actions: {
    setColor(context, newColor){
      context.commit('setColor', newColor)
    },
    setGlossy(context, glossyState){
      console.log(glossyState)
      context.commit('setGlossy', glossyState)
    }
  },
  getters: {
    getColor(state) {
      return state.color
    },
    getGlossy(state) {
      return state.glossy
    },
    getLang(){
      return `pt`
    }
  }
});
