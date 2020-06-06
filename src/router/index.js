import Vue from 'vue'
import VueRouter from 'vue-router'

const Test = () => import('../components/test.vue')
const ErrorPage = () => import('../pages/ErrorPage.vue')
const Mall = () => import('../pages/client/Mall.vue')
const MallLogin = () => import('../pages/client/MallLogin.vue')
const MallShow = () => import('../pages/client/MallShow.vue')
const MallIndex = () => import('../pages/client/MallIndex.vue')
const GoodsList = () => import('../pages/client/GoodsList.vue')
const GoodsDetail = () => import('../pages/client/GoodsDetail.vue')
const OrderPlace = () => import('../pages/client/OrderPlace.vue')
const OrderSuccess = () => import('../pages/client/OrderSuccess.vue')

const Personal = () => import('../pages/client/Personal.vue')
const Cart = () => import('../pages/client/Cart.vue')
const Order = () => import('../pages/client/Order.vue')
const Address = () => import('../pages/client/Address.vue')
const Information = () => import('../pages/client/Information.vue')
// 重写push方法，
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  // 捕获添加路由时的异常 1.push当前的路由地址
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/mall'
  },
  {
    // 用户登录路由
    path: '/login',
    name: 'MallLogin',
    component: MallLogin
  },
  {
    // 用户使用主体路由
    path: '/mall',
    name: 'Mall',
    component: Mall,
    redirect: '/mall/show',
    children: [
      {
        path: 'show',
        name: 'MallShow',
        component: MallShow,
        redirect: '/mall/show/index',
        children: [
          {
            path: 'index',
            name: 'MallIndex',
            component: MallIndex
          },
          {
            path: 'goodsList/:typeId/:keyword',
            name: 'GoodsList',
            component: GoodsList
          }
        ]
      },
      {
        path: 'goods/:id',
        name: 'GoodsDetail',
        component: GoodsDetail
      },
      {
        path: 'orderPlace',
        name: 'OrderPlace',
        component: OrderPlace
      },
      {
        path: 'orderSuccess',
        name: 'OrderSuccess',
        component: OrderSuccess
      },
      {
        // 用户个人中心路由
        path: 'personal',
        name: 'Personal',
        component: Personal,
        redirect: '/mall/personal/cart',
        children: [
          {
            path: 'cart',
            name: 'Cart',
            component: Cart
          },
          {
            path: 'order',
            name: 'Order',
            component: Order
          },
          {
            path: 'address',
            name: 'Address',
            component: Address
          },
          {
            path: 'information',
            name: 'Information',
            component: Information
          }
        ]
      }
    ]
  },
  {
    // 默认的不匹配的error页面  404
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  },
  {
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
