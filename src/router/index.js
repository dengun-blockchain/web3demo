import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
// SHAME: should have its own page
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
