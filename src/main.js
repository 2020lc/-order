import Vue from 'vue'
import jquery from 'jquery'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "amfe-flexible"


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  jquery,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
