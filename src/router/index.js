import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/Home';
import Products from '@/components/pages/admin/Products';
import CustomerOders from '@/components/pages/CustomerOders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Orders from '@/components/pages/admin/Orders';
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
          name: 'CustomerOders,',
          component: CustomerOders,
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
