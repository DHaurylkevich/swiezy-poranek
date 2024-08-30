import { createRouter, createWebHistory } from "vue-router";

// Компоненты
const HomeLayout = () => import("../layout/DefaultLayout.vue");
const AdminLayout = () => import("../layout/AdminLayout.vue");
const AdminFoodSets = () => import("../views/admin/AdminFoodSets.vue");
const AdminOrders = () => import("../views/admin/AdminOrders.vue");
const HomeSection = () => import("../views/home/Home.vue");
const OrderPage = () => import("../views/order/Order.vue");
const SelectPackage = () => import("../views/order/SelectPackage.vue");
const SelectAddons = () => import("../views/order/SelectAddons.vue");
const AddressData = () => import("../views/order/AddressData.vue");
const OrderSummary = () => import("../views/order/OrderSummary.vue");

const routes = [
  { 
    path: "/", 
    component: HomeLayout,
    children: [
      {
        path: "", 
        name: "Home", 
        component: HomeSection
      },
      {
        path: "order",
        component: OrderPage,
        children: [
          { 
            path: "", 
            redirect: "order/zestawy" 
          },
          { 
            path: "zestawy", 
            name: "SelectPackage", 
            component: SelectPackage 
          },
          {
            path: "dodatki",
            name: "SelectAddons",
            component: SelectAddons
          },
          {
            path: "dane-dostawy",
            name: "AddressData",
            component: AddressData
          },
          {
            path: "podsumowanie",
            name: "OrderSummary",
            component: OrderSummary
          }
        ]
      }
    ]
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { 
      requiresAuth: true 
    },
    children: [
      { 
        path: "zestawy", 
        name: "AdminFoodSets",
        component: AdminFoodSets 
      },
      { 
        path: "orders", 
        name: "AdminOrders",
        component: AdminOrders 
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // В реальном проекте должна быть логика проверки аутентификации

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
