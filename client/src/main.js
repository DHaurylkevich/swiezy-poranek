import { createApp } from 'vue';
import App from "./App.vue";
import router from './router';
import VueScrollTo from 'vue-scrollto';
import store from './store';
import './assets/styles/global.css'; 

createApp(App).use(router).use(VueScrollTo).use(store).mount("#app");