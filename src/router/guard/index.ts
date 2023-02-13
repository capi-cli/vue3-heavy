import type { Router, RouteLocationNormalized } from 'vue-router';
import { setRouteChange } from '@/logics/routeChange';
import { createStateGuard } from './stateGuard';
import { createPermissionGuard } from './permissionGuard';
import { createParamMenuGuard } from './paramMenuGuard';

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router);
  createStateGuard(router);
}

/**
 * 处理页面状态
 */
 function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由变化
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

