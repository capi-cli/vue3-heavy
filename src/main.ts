import '@unocss/reset/normalize.css';
import '@unocss/reset/eric-meyer.css';
import '@unocss/reset/tailwind.css';
import 'virtual:svg-icons-register';
import './styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import 'uno.css';
import router, { setupRouter } from './router';
import { initAppConfigStore } from './logics/initAppConfig';
import { setupRouterGuard } from './router/guard';
// import 'element-plus/dist/index.css';

async function bootstrap() {
  const app = createApp(App);

  setupRouter(app);

  setupStore(app);

  setupRouterGuard(router);

  initAppConfigStore();

  app.mount('#app');
}

bootstrap();
