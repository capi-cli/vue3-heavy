import type { MenuSetting, ProjectConfig } from '#/config';
import type { BeforeMiniState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { Cache } from '@/utils/cache';
import { deepMerge } from '@/utils';
import { resetRouter } from '@/router';

interface AppState {
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
  // 记录初始状态
  beforeMiniInfo: BeforeMiniState;
  themeSettings: any
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Cache.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
    themeSettings: {
      background: "#fff",
      color: "#000"
    }
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || Cache.getLocal(PROJ_CFG_KEY) || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Cache.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    async resetAllState() {
      resetRouter();
      Cache.clearAll();
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
