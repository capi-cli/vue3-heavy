import type { AppRouteRecordRaw, Menu } from '@/router/types';

import { defineStore } from 'pinia';
import { store } from '@/store';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { transformRouteToMenu } from '@/router/helper/menuHelper';

import projectSetting from '@/settings/projectSetting';

async function getRoleList(){
  const list = ['/hi/:name','/hi/tst','/example/formtable','/hi/tst/xxx']
  return new Set(list)
}

import { PageEnum } from '@/enums/pageEnum';
import { getAsyncRoutes } from '@/router/routes';

interface PermissionState {
  // 是否动态添加路由
  isDynamicAddedRoute: boolean;
  // 触发菜单更新
  lastBuildMenuTime: number;
  // 菜单列表
  menuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    menuList: [],
  }),
  getters: {
    getMenuList(): Menu[] {
      return this.menuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list;
      // list?.length > 0 && this.setLastBuildMenuTime();
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.menuList = [];
      this.lastBuildMenuTime = 0;
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      // const userStore = useUserStore();
      // const appStore = useAppStoreWithOut();
      const roleList = await getRoleList()

      let routes = getAsyncRoutes() as AppRouteRecordRaw[];

      const routeFilter = (route: AppRouteRecordRaw) => {
        return roleList.has(route.path)
      };

      // const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
      //   const { meta } = route;
      //   const { ignoreRoute } = meta || {};
      //   return !ignoreRoute;
      // };


      // routes = routes.filter(routeFilter);

      const menuList = transformRouteToMenu(routes);
      this.setMenuList(menuList);

      // remove meta.ignoreRoute item
      // routeList = filter(routeList, routeRemoveIgnoreFilter);
      // routeList = routeList.filter(routeRemoveIgnoreFilter);

      // routeList = flatMultiLevelRoutes(routeList);
      // routes = [/* PAGE_NOT_FOUND_ROUTE, */ ...routeList];

      return routes;
    },
  },
});


export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
