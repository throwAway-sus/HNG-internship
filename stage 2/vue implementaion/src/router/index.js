import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/session'
import { useToast } from "vue-toastification";

import LandingPage from "../pages/LandingPage.vue"
import LoginPage from "../pages/auth/LoginPage.vue"
import SignupPage from "../pages/auth/SignupPage.vue"
import DashboardPage from "../pages/DashboardPage.vue"
import TicketsPage from "../pages/TicketsPage.vue"
import TicketDetailPage from "../pages/TicketDetailPage.vue"

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth/login', component: LoginPage },
  { path: '/auth/signup', component: SignupPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    component: TicketsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/:id',
    component: TicketDetailPage,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const toast = useToast();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      toast.error("Your session has expired — please log in again.");
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next(); 
    }
  } else {
    next();
  }
});

export default router