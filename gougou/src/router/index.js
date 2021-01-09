import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/amend",
      component: () => import("../pages/Amend.vue"),
    },
    {
      path: "/edit",
      component: () => import("../pages/Edit.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../pages/Register.vue"),
    },
  ],
  linkActiveClass: "active",
});

export default router;
