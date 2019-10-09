import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import {Home,Login} from '@/views/index';
import {subrouting} from './subrouting';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
      children:subrouting,
      // children: [
      //   {
      //       path:"banner",
      //       component:()=>import("../views/home/children/banner/index.vue")
      //   }
      // ],
    }
  ],
});
