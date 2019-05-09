import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/system",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "/about",
          name: "about",
          component: About
        },
        {
          path: '/exame/:id',
          name: 'exame',
          component: () => import('./views/Exame.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
});
