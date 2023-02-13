import type { Router } from 'vue-router';
import { configureDynamicParamsMenu } from '../helper/menuHelper';
import { Menu } from '../types';

import { usePermissionStoreWithOut } from '@/store/modules/permission';

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, _, next) => {
    // 过滤无名称路由
    if (!to.name) {
      next();
      return;
    }

    // // 菜单已经建立
    // if (!permissionStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }

    let menus: Menu[] = [];
    menus = permissionStore.getMenuList;
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params));

    next();
  });
}
