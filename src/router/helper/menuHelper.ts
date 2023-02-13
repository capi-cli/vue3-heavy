import type { MenuModule, Menu, AppRouteRecordRaw } from '@/router/types';
import { findPath, treeMap } from '@/utils/helper/treeHelper';
import { cloneDeep, omit } from 'lodash-es';
import { isUrl } from '@/utils/is';
import { RouteParams } from 'vue-router';
import { toRaw } from 'vue';
import { RoutePathConfig } from '../config';

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // 以`/`开头的视作根路径，定义子路径时可不使用嵌套路径
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 路径不是从 /开始的，也不是URL，加入父路径
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
    }
  }
}

// 解析菜单模块
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParentPath(menuList);
  return menuList[0];
}

export function transformRouteToMenu(routeModList: AppRouteRecordRaw[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];
  const menuMap: Map<string, AppRouteRecordRaw[]> = new Map();
  cloneRouteModList.forEach((item) => {
    const { children } = item;
    const [, base] = item.path.split('/');
    const routeArr = menuMap.get(base) || [];

    let innerInfo = {} as AppRouteRecordRaw;
    if (Array.isArray(children) && children.length) {
      innerInfo = children[0];
    }

    const baseMenu = {
      ...innerInfo,
      path: item.path,
    };
    routeArr.push(omit(baseMenu, ['children' , 'component']));

    menuMap.set(base, routeArr);
  });

  menuMap.forEach((val, key) => {
    const config = Reflect.get(RoutePathConfig, key);
    const route = {
      meta: {
        ...config,
      },
      path: `/${key}`,
      children: val,
    };
    routeList.push(route as AppRouteRecordRaw);
  });
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node;
      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      };
    },
  });

  joinParentPath(list);
  return cloneDeep(list);
}

/**
 * 配置菜单
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu);
  let realPath = paramPath ? paramPath : path;
  const matchArr = realPath.match(menuParamRegex);

  matchArr?.forEach((it) => {
    const realIt = it.substr(1);
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string);
    }
  });

  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path;
  }

  menu.path = realPath;
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params));
}
