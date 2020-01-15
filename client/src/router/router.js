import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store' 

import Home from '../pages/Home'
import SignUp from '../pages/SignUp'

Vue.use(Router)

let router = new Router ({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
  ]
})

// TODO //
// Implement validation if user has already registered //
// before go to confirm page //
//router.beforeEach((to, from, next) => {})

export default router