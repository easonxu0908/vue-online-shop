// 官方必須元件
import Vue from 'vue';
import Router from 'vue-router';
// 自定
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/Home';
import Index from '@/components/pages/Index';
import Products from '@/components/pages/admin/Products';
import CustomerOders from '@/components/pages/CustomerOders';
import CardDetail from '@/components/pages/CardDetail';
import Checkout from '@/components/pages/Checkout';
import CheckoutInfo from '@/components/pages/CheckoutInfo';
import CheckoutPay from '@/components/pages/CheckoutPay';
import Orders from '@/components/pages/admin/Orders';
import SearchOrder from '@/components/pages/SearchOrder';
import MyOrders from '@/components/pages/MyOrders';
import Cart from '@/components/pages/Cart';
import Coupon from '@/components/pages/admin/Coupon';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Index',
          component: Index,
        },
        {
          path: '/customerOders',
          name: 'CustomerOders',
          component: CustomerOders,
        },
        {
          path: '/cardDetail/:prodId',
          name: 'CardDetail',
          component: CardDetail,
        },
        {
          path: '/searchOrder',
          name: 'SearchOrder',
          component: SearchOrder,
        },
        {
          path: '/myOrders',
          name: 'MyOrders',
          component: MyOrders,
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: '/',
          name: 'Checkout',
          component: Checkout,
          children: [
            {
              path: '/checkout',
              name: 'CheckoutInfo',
              component: CheckoutInfo,
            },
            {
              path: '/checkoutPay/:orderID',
              name: 'CheckoutPay',
              component: CheckoutPay,
            }
          ]
        },
      ],
    },
    {
      path: '/login',
      name: 'Login,',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        }
      ],
    },
  ]
})
