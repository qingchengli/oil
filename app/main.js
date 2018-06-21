// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import beforeEach from './router/hooks/beforeEach'
import store from '@/store'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import i18n from './i18n/i18n'
import axios from './http'
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/dataZoom'
import echarts from 'echarts'
import moment from 'moment'
import flvjs from 'flv.js'
// import 'babel-polyfill'
import 'es6-promise/auto'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/assets/css/base.scss'
import '@/assets/css/rewrite.scss'
import '@/assets/iconfont/iconfont.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$flvjs = flvjs

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)

router.beforeEach(beforeEach)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  i18n,
  components: { App },
  template: '<App/>'
})
