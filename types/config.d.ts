import { CacheTypeEnum } from '@/enums/cacheEnum';

export interface GlobConfig {
  // 标题
  title: string;
  // 接口地址
  apiUrl: string;
  // 项目缩写
  shortName: string;
}
export interface GlobEnvConfig {
  // 标题
  VITE_GLOB_APP_TITLE: string;
  // 接口地址
  VITE_GLOB_API_URL: string;
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string;
}

export interface MenuSetting {
  // mode: MenuModeEnum;
  // type: MenuTypeEnum;
  split: boolean;
  collapsed: boolean;
}

export interface ProjectConfig {
  // 权限相关信息
  permissionCacheType: CacheTypeEnum;
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean;

  showLogo: boolean;
  // 是否显示页脚
  showFooter: boolean;
  // 菜单配置
  menuSetting: MenuSetting;
}
