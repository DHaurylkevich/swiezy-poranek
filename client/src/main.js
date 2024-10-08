import { createApp } from 'vue';
import App from "./App.vue";
import router from './router';
import { refreshTokenAdmin } from './services/adminServices';
import VueScrollTo from "vue-scrollto";
import VueObserveVisibility from "vue-observe-visibility";
import store from "./store";
import './assets/styles/global.css';

let refreshTokenInterval = setInterval(async () => { await refreshTokenAdmin() }, 55* 60 * 1000);
if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
}

createApp(App)
    .use(router)
    .use(VueScrollTo)
    .use(VueObserveVisibility)
    .use(store)
    .mount("#app");