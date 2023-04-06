import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',  
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/RegisterView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/restos",
      name: "restos",
      component: () => import("../views/RestoView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/restos/:id",
      name: "restos-show",
      component: () => import("../views/RestoDetailView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/restos/create",
      name: "restos-create",
      component: () => import("../views/RestoCreate.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/restos/edit/:id",
      name: "restos-edit",
      component: () => import("../views/RestoEdit.vue"),
      meta: {
        requiresAuth: true
      }
    },


  ],
  
})

router.beforeEach((to,from) =>{
  if (to.meta.requiresAuth && !localStorage.getItem('access_token')){
      return { name: 'Login'}
  }
  if (to.meta.requiresAuth === false && localStorage.getItem('access_token')){
      return { name: 'restos'}
  }
})


export default router;