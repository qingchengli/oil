const menu = {
  state: {
    isCollapse: sessionStorage.isCollapse ? JSON.parse(sessionStorage.isCollapse) : false
  },
  mutations: {
    SET_COLLAPSE: (state, status) => {
      state.isCollapse = status
      sessionStorage.isCollapse = status
    }
  },
  actions: {
    setCollapse ({ commit }, status) {
      commit('SET_COLLAPSE', status)
    }
  }
}

export default menu
