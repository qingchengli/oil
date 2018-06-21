import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import lang from './modules/lang'
import menu from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    lang,
    menu
  }
})

export default store
