import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
