import Vue from 'vue'
import Router from 'vue-router'
import Main from './modules/main'
// import Login from './modules/login'

Vue.use(Router)

var router = new Router({
  routes: [
    // ...Login
    ...Main
  ]
})

export default router
