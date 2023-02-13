import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { getBasicRoutes } from './routes';

export const WHITE_NAME_LIST: string[] = [
  PageEnum.ALL,
  PageEnum.HOME,
  PageEnum.LOGIN
];

const BasicRoutes = getBasicRoutes()

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: BasicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if(name && !WHITE_NAME_LIST.includes(name as string)){
      router.hasRoute(name) && router.removeRoute(name);
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
