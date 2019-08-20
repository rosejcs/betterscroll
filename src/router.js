import Vue from 'vue'
import Router from 'vue-router'
import Bs from './views/Bs.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:Bs
    },
  ]
})
