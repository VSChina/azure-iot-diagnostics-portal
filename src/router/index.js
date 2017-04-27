import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AppMap from '@/components/AppMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/appmap',
      name: 'appMap',
      component: AppMap
    }
  ],
  linkActiveClass: 'active'
})
