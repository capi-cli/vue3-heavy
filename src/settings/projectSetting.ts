import type { ProjectConfig } from '#/config';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import { MenuTypeEnum , MenuModeEnum } from '@/enums/menuEnum';

const setting: ProjectConfig = {
  showSettingButton: true,

  showDarkModeToggle: true,

  // 缓存存储在sessionStorage或localStorage中
  permissionCacheType: CacheTypeEnum.LOCAL,

  // themeColor: primaryColor,

  showLogo: true,

  showFooter: false,

  // headerSetting: {
  //   fixed: true,
  //   show: true,
  //   useLockPage: true,
  //   showFullScreen: true,
  //   showDoc: true,
  //   showNotice: true,
  //   showSearch: true,
  // },

  menuSetting: {
    collapsed: true,
    split: false,
  },

 
};

export default setting;
