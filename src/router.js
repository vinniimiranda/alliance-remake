import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/studies",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/exame",
          name: "exame",
          props: route => ({
            ...route.params
          }),
          component: () => import("./views/Exame.vue")
        }
      ]
    },
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("./views/Forgot.vue")
    }
  ]
});
