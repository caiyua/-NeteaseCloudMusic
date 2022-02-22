import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie' // 将vuex存入local
import './assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.use(VueCookie)


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
}).$mount('#app')
