import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store' 

import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import Confirm from '../pages/Confirm'

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
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    }
  ]
})

// TODO //
// Implement validation if user has already registered //
// before go to confirm page //
//router.beforeEach((to, from, next) => {})

export default router