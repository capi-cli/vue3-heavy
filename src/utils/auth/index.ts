import { Cache, BasicKeys } from '@/utils/cache';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { TOKEN_KEY } from '@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Cache.getLocal : Cache.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Cache.setLocal : Cache.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Cache.clearLocal : Cache.clearSession;
  return fn(immediate);
}
