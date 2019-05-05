import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/Home';
import Products from '@/components/pages/admin/Products';
import CustomerOders from '@/components/pages/CustomerOders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Checkout from '@/components/pages/Checkout';
import CheckoutInfo from '@/components/pages/CheckoutInfo';
import CheckoutPay from '@/components/pages/CheckoutPay';
import CheckoutFinish from '@/components/pages/CheckoutFinish';
import Orders from '@/components/pages/admin/Orders';
import SearchOrder from '@/components/pages/SearchOrder';
import Coupon from '@/components/pages/admin/Coupon';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
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
          path: '/searchOrder',
          name: 'SearchOrder',
          component: SearchOrder,
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
              path: '/checkout/pay',
              name: 'CheckoutPay',
              component: CheckoutPay,
            },
            {
              path: '/finish/:id',
              name: 'CheckoutFinish',
              component: CheckoutFinish,
              beforeEnter: (to, from, next) => {
                console.log(to, from, next);
                if (from.name != "CheckoutPay") {
                  next({
                    path: '/checkout/pay',
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
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'CustomerOders,',
          component: CustomerOders,
        },
        {
          path: 'customer_oders',
          name: 'CustomerOders,',
          component: CustomerOders,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout,',
          component: CustomerCheckout,
        },
        {
          path: 'search_order',
          name: 'SearchOrder,',
          component: SearchOrder,
        }
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
