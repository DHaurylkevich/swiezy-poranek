import { createRouter, createWebHistory } from 'vue-router';
import Home from "../layout/DefaultLayout.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import FoodSet from '../views/admin/FoodSet.vue';
import Orders from '../views/admin/Orders.vue';

const routes = [
  { path: '/', 
    component: Home,
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { 
      requiresAuth: true 
    },
    children: [
      { path: "foodset", component: FoodSet },
      { path: "orders", component: Orders },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = true; 

  if (to.meta.requiresAuth && !isAuthenticated){
    next("/");
  } else {
    next();
  }
});

export default router;
