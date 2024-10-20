import { createApp } from 'vue';
import App from "./App.vue";
import router from './router';
import VueScrollTo from "vue-scrollto";
import VueObserveVisibility from "vue-observe-visibility";
import store from "./store";
import './assets/styles/global.css';

createApp(App)
    .use(router)
    .use(VueScrollTo)
    .use(VueObserveVisibility)
    .use(store)
    .mount("#app");