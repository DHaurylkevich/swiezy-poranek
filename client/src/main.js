import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Проверка наличия конфигурации
if (!router) {
  console.error("Router или Store не определены");
}

// Создание и настройка приложения
const app = createApp(App);

// Использование маршрутизатора и хранилища состояний (если есть)
app.use(router);

app.mount('#app');