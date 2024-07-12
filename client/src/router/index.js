import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AdminLayout from '../layout/AdminLayout.vue';
import Dashboard from '../components/admin/Dashboard.vue';
import FoodSet from '../components/admin/FoodSet.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'foodset', component: FoodSet },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // Проверка аутентификации пользователя

  if (to.meta.requiresAuth && !isAuthenticated){
    next("/");
  } else {
    next();
  }
});

export default router;
