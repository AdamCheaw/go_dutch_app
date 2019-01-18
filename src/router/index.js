import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/DutchSummary'
import DutchForm from '@/components/DutchForm'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/adding',
      name: 'DutchForm',
      component: DutchForm
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
