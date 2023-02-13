import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '@/store/modules/permission';

import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user';


const LOGIN_PATH = PageEnum.LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    // if (
    //   from.path === ROOT_PATH &&
    //   to.path === PageEnum.HOME &&
    //   userStore.getUserInfo.homePath &&
    //   userStore.getUserInfo.homePath !== PageEnum.HOME
    // ) {
    //   next(userStore.getUserInfo.homePath);
    //   return;
    // }

    const token = userStore.getToken;

    // 白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    if (!token) {
      // 如果不需要token的页面. 在路由meta里将ignoreAuth设为true
      // if (to.meta.ignoreAuth) {
      //   next();
      //   return;
      // }

      // // 重定向至登录页面
      // const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
      //   path: LOGIN_PATH,
      //   replace: true,
      // };
      // if (to.path) {
      //   redirectData.query = {
      //     ...redirectData.query,
      //     redirect: to.path,
      //   };
      // }
      // next(redirectData);
      // return;
    }
    // 处理跳转到404页面
    if (
      from.path === LOGIN_PATH &&
      to.name === 'all' &&
      to.fullPath !== (PageEnum.HOME)
    ) {
      next(PageEnum.HOME);
      return;
    }

    // 当上次读取时间为空时，获取userinfo
    if (userStore.getLastUpdateTime === 0) {
      try {
        // await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    permissionStore.setDynamicAddedRoute(true);
    
    if (to.name === 'all') {
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
