import { createRouter, createWebHistory } from "vue-router";
import { checkAuth } from "@/services/adminServices";

const HomeLayout = () => import("../layout/DefaultLayout.vue");
const AdminLayout = () => import("../layout/AdminLayout.vue");
const AdminPackage = () => import("../views/admin/AdminPackage.vue");
const AdminMenu = () => import("../views/admin/AdminMenu.vue");
const AdminOrders = () => import("../views/admin/AdminOrders.vue");
const AdminContacts = () => import("../views/admin/AdminContacts.vue");
const AdminGallery = () => import("../views/admin/AdminGallery.vue");
const LoginPage = () => import("../views/admin/LoginPage.vue");
import HomeSection from "../views/home/Home.vue";
import OrderPage from "../views/order/Order.vue";
import SelectPackage from "../views/order/SelectPackage.vue";
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
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/admin",
    component: AdminLayout,
    redirect: "/admin/zestawy",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "zestawy",
        name: "AdminFoodSets",
        component: AdminPackage,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: "menu",
        name: "AdminMenu",
        component: AdminMenu
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: AdminOrders
      },
      {
        path: "contacts",
        name: "AdminContacts",
        component: AdminContacts
      },
      {
        path: "gallery",
        name: "AdminGallery",
        component: AdminGallery
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  try {
    if (to.meta.requiresAuth) {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        console.log(isAuthenticated)
        next();
      }else{
        next({ name: "LoginPage" });
      }
    } else {
      next();
    }
  } catch (err) {
    next({ name: "LoginPage" });
  }
});

export default router;
