import Vue from 'vue'
import VueRouter from 'vue-router'
import AddTodo from '../views/AddTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AddTodo',
    component: AddTodo
  },
  {
    path: '/kids',
    name: 'KidsTodo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/KidsTodo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
