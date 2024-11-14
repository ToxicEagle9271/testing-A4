import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth'; // Modular Firebase SDK for authentication
import Login from '../views/Login.vue';
import db from '../firebaseDb';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/subscriptionsList',
    name: 'SubscriptionsList',
    component: () => import('../components/SubscriptionsList.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/Edit.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../components/Create.vue'),
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Authentication Guard: Check if the user is authenticated before navigating to protected routes
router.beforeEach((to, from, next) => {
  const auth = getAuth(); // Get auth instance using modular SDK
  const user = auth.currentUser; // Check if there's a logged-in user
  
  if (to.matched.some(record => record.meta.authRequired)) {
    if (user) {
      next(); // If the user is authenticated, proceed to the route
    } else {
      // Redirect to login with the 'redirect' query parameter to go back after successful login
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next(); // If no authentication is required, just proceed
  }
});

export default router;
