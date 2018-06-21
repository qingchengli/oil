import axios from 'axios'

const user = {
  state: {
    logged: localStorage.logged ? JSON.parse(localStorage.logged) : false,
    roles: [],
    userInfo: {}
  },

  mutations: {
    SET_LOGGED: (state, status) => {
      localStorage.logged = status
      state.logged = status
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGGEDOUT: (state) => {
      localStorage.logged = false
      state.logged = false
      state.userInfo = {}
      state.roles = []
    }
  },

  actions: {
    // 登录
    Login ({ commit }, {userInfo, roles}) {
      commit('SET_LOGGED', true)
      commit('SET_USERINFO', userInfo)
      commit('SET_ROLES', roles)
    },

    // 用户信息
    SetUser ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        axios.all([axios.get(`${process.env.API_HOST}cms/user/getUserInfo`), axios.get(`${process.env.API_HOST}cms/user/getRoleList`)])
          .then(axios.spread((res1, res2) => {
            if (res1.status === 200 && res2.status === 200) {
              if (res1.data.status && res2.data.status) {
                commit('SET_USERINFO', res1.data.data)
                commit('SET_ROLES', res2.data.data)
                resolve()
              }
            }
          }))
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.API_HOST}cms/logout`)
          .then((res) => {
            if (res.status === 200) {
              commit('SET_LOGGEDOUT')
              resolve()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}

export default user
