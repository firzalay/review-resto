import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../components/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',  
      component: LoginView,
    },
    {
      path: "/restos",
      name: "restos",
      component: () => import("../views/RestoView.vue"),
    },
    {
      path: '/home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView
    },

  ],
  
})



export default router;
