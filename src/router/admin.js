import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
// 控件引用
const Test = () => import('../components/test.vue')
const AdminLogin = () => import('../pages/admin/AdminLogin.vue')
const ErrorPage = () => import('../pages/ErrorPage.vue')
const BackStage = () => import('../pages/admin/BackStage.vue')
const EditUser = () => import('../pages/admin/EditUser.vue')
const Goods = () => import('../pages/admin/Goods.vue')
const EditGoods = () => import('../pages/admin/EditGoods.vue')
const Order = () => import('../pages/admin/Orders.vue')
// const EditOrder = () => import('../pages/admin/EditOrder.vue')
const EditAdmin = () => import('../pages/admin/EditAdmin.vue')

// 对vue-router3.0以上版本出现的promise undefined 重写原型
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path: '/',
    redirect: '/adminLogin'
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/backstage',
    name: 'backStage',
    redirect: '/backstage/editUser',
    component: BackStage,
    children: [
      {
        path: 'editUser',
        name: 'editUser',
        component: EditUser,
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: Goods,
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'goods/:id',
        name: 'editGoods',
        component: EditGoods,
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: Order,
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'editAdmin',
        name: 'editAdmin',
        component: EditAdmin,
        meta: {
          requireLogin: true
        }
      }
    ]
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = new VueRouter({
  routes
});

// 路由拦截:在登录后台系统时,需要先判断登录状态 :[根据'meta.requireLogin'和可修改的meta.login判断]
router.beforeEach((to, from, next) => {
  if (to.name === 'adminLogin') {
    if (store.state.adminToken) {
      next({
        path: '/backstage/editUser'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    // 当前登录状态检查
    if (store.state.adminToken) {
      next();
    } else {
      next({
        path: '/adminLogin',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
});

export default router
