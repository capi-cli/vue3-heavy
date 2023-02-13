import type { RouteRecordRaw } from 'vue-router';
import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { PageEnum } from '@/enums/pageEnum';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  // 登录是否过期
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: void 0,
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string {
      return this.token || '';
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    async afterLoginAction(goHome?: boolean): Promise<{/* 用户信息 */ [key:string]:any} | null> {
      if (!this.getToken) return null;

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        // const permissionStore = usePermissionStore();
        // if (!permissionStore.isDynamicAddedRoute) {
        //   const routes = await permissionStore.buildRoutesAction();
        //   routes.forEach((route) => {
        //     router.addRoute(route as unknown as RouteRecordRaw);
        //   });
        //   // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        //   permissionStore.setDynamicAddedRoute(true);
        // }
        goHome && (await router.replace(PageEnum.HOME));
      }
      return null;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = /* await getUserInfo() */{} as any;

      this.setUserInfo(userInfo);
      return userInfo;
    },
  },
});
// 使用示例:
// const userStore = useUserStore();
// 获取：let info = userStore.getUserInfo
// 设置：userStore.setUserInfo({username:"xxx"})
//

// 需要在安装程序之外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
