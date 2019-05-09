import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/Home';
import Products from '@/components/pages/admin/Products';
import CustomerOders from '@/components/pages/CustomerOders';
import CardDetail from '@/components/pages/CardDetail';
import Checkout from '@/components/pages/Checkout';
import CheckoutInfo from '@/components/pages/CheckoutInfo';
import CheckoutFinish from '@/components/pages/CheckoutFinish';
import Orders from '@/components/pages/admin/Orders';
import SearchOrder from '@/components/pages/SearchOrder';
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
              path: '/finish/:id',
              name: 'CheckoutFinish',
              component: CheckoutFinish,
              beforeEnter: (to, from, next) => {
                console.log(to, from, next);
                if (from.name != "CheckoutInfo") {
                  next({
                    path: '/checkout',
                  })
                }
                else {
                  next();
                }
              }
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
