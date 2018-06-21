const lang = {
  state: {
    language: localStorage.language || 'cn',
    language_list: ['cn', 'en']
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.language = language
    }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default lang
