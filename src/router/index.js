import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',  
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/restos",
      name: "restos",
      component: () => import("../views/RestoView.vue"),
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/restos/:id",
      name: "restos-show",
      component: () => import("../views/RestoDetailView.vue"),
    },
    {
      path: "/restos/create",
      name: "restos-create",
      component: () => import("../views/RestoCreate.vue"),
    },
    {
      path: "/restos/edit/:id",
      name: "restos-edit",
      component: () => import("../views/RestoEdit.vue"),
    },


  ],
  
})



export default router;