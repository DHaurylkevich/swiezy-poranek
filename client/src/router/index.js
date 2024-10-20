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
const HomeSection = require("../views/home/Home.vue");
const OrderPage = () => import("../views/order/Order.vue");
const SelectPackage = () => import("../views/order/SelectPackage.vue");
const SelectAddons = () => import("../views/order/SelectAddons.vue");
const AddressData = () => import("../views/order/AddressData.vue");
const OrderSummary = () => import("../views/order/OrderSummary.vue");
const LastPage = () => import("../views/order/LastPage.vue");

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeSection,
        meta: {
          title: 'Świeży Poranek - Catering w Poznaniu',
          description: 'Zapraszamy do Świeżego Poranka! Oferujemy pyszne dania cateringowe, które zaspokoją każde podniebienie. Sprawdź nasze menu i dowiedz się więcej o naszych usługach cateringowych.',
          keywords: 'swiezy poranek catering Poznań, jedzenie na wynos, usługi cateringowe, menu, dania, catering na imprezy',
          robots: 'index, follow'
        },
        children: [

        ]
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
            component: SelectPackage,
            meta: {
              title: 'Wybierz Pakiet - Świeży Poranek',
              description: 'Wybierz idealny pakiet cateringowy, który najlepiej odpowiada Twoim potrzebom. Oferujemy różnorodne opcje dla każdego!',
              keywords: 'swiezy poranek pakiet cateringowy, catering na wynos, zestawy, jedzenie na imprezy',
              robots: 'index, follow'
            }
          },
          {
            path: "dodatki",
            name: "SelectAddons",
            component: SelectAddons,
            meta: {
              title: 'Wybierz Dodatki - Świeży Poranek',
              description: 'Dodaj coś ekstra do swojego zamówienia! Sprawdź nasze pyszne dodatki do dań.',
              keywords: 'swiezy poranek dodatki do jedzenia, pyszne dodatki, catering, jedzenie na wynos',
              robots: 'index, follow'
            }
          },
          {
            path: "dane-dostawy",
            name: "AddressData",
            component: AddressData,
            meta: {
              title: 'Dane Dostawy - Świeży Poranek',
              description: 'Wprowadź dane dostawy, abyśmy mogli zrealizować Twoje zamówienie. Upewnij się, że informacje są poprawne.',
              keywords: ' swiezy poranek dane dostawy, zamówienie, catering Poznań',
              robots: 'index, follow'
            }
          },
          {
            path: "podsumowanie",
            name: "OrderSummary",
            component: OrderSummary,
            meta: {
              title: 'Podsumowanie Zamówienia - Świeży Poranek',
              description: 'Sprawdź podsumowanie swojego zamówienia przed złożeniem. Upewnij się, że wszystko się zgadza!',
              keywords: 'swiezy poranek podsumowanie zamówienia, catering Poznań, zamówienia online',
              robots: 'index, follow'
            }
          },
        ]
      },
      {
        path: "confirm",
        name: "LastPage",
        component: LastPage,
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
      } else {
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
