import type { ProjectConfig } from '#/config';

import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';

import { useAppStore } from '@/store/modules/app';

import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env';

import { Cache } from '@/utils/cache';
import { deepMerge } from '@/utils';

// 初始化项目配置
export function initAppConfigStore() {

  const appStore = useAppStore();
  const projCfg: ProjectConfig = Cache.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  
  appStore.setProjectConfig(deepMerge(projectSetting, projCfg || {}));

  // setTimeout(() => {
  //   clearObsoleteStorage();
  // }, 16);
}

/**
 * 删除无用的缓存
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
