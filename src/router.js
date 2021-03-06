import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home"
import Manager from './views/Manager'
import Award from './views/Award'
import About from './views/About'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/video/:id",
      name: "video",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Detail.vue")
    },
    {
      path: "/manager",
      name: "manager",
      component: Manager
    },
    {
      path: "/award",
      name: "award",
      component: Award
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
  ]
});
