import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/user/Home.vue'
import Login from '@/views/pages/user/login.vue'
import Register from '@/views/pages/user/register.vue'
import Account from '@/views/pages/user/Account.vue'
import Pay from '@/views/pages/user/Pay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive:true,
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/account',
      name:'account',
      component:Account
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    }
  ]
})
