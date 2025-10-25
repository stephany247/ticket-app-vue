// import { createRouter, createWebHistory } from 'vue-router'

// import Landing from '../pages/Landing.vue'
// import Login from '../pages/Login.vue'
// import Register from '../pages/Register.vue'
// import Dashboard from '../pages/Dashboard.vue'
// import TicketManager from '../pages/TicketManager.vue'

// // optional: protected route simulation
// import ProtectedRoute from '../components/ProtectedRoute.vue'

// const routes = [
//   { path: '/', component: Landing },
//   { path: '/auth/login', component: Login },
//   { path: '/auth/register', component: Register },
//   {
//     path: '/dashboard',
//     component: ProtectedRoute,
//     children: [{ path: '', component: Dashboard }],
//   },
//   {
//     path: '/tickets',
//     component: ProtectedRoute,
//     children: [{ path: '', component: TicketManager }],
//   },
//   { path: '/:pathMatch(.*)*', redirect: '/' },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useToastStore } from "../stores/useToastStore";

import Register from "../pages/Register.vue";
import Landing from "../pages/Landing.vue";
import Login from "../pages/Login.vue";
import TicketManager from "../pages/TicketManager.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes = [
  { path: "/", name: "home", component: Landing },
  { path: "/auth/login", name: "login", component: Login },
  { path: "/auth/register", name: "register", component: Register },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // ✅ protected
  },
  {
    path: "/tickets",
    name: "tickets",
    component: TicketManager,
    meta: { requiresAuth: true }, // ✅ protected
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const toastStore = useToastStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // toastStore.showToast("Your session has expired — please log in again.", "error");
    if (!authStore.logout) {
      toastStore.showToast(
        "Your session has expired — please log in again.",
        "error"
      );
    }

    authStore.logout();
    authStore.logout(); // optional
    next({ path: "/auth/login" }); // redirect to home or login
  } else {
    next();
  }
});

export default router;
