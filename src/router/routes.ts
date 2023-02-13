import { PageEnum } from '@/enums/pageEnum';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const constantRoutes = setupLayouts(generatedRoutes)

const basicList = new Set([PageEnum.LOGIN,PageEnum.ALL,PageEnum.HOME])
// 获取基础路由
export function getBasicRoutes(){
  return constantRoutes.filter(routes => basicList.has(routes.path as PageEnum))
}
//获取动态路由
export function getAsyncRoutes(){
  return constantRoutes.filter(routes => !basicList.has(routes.path as PageEnum)) 
}