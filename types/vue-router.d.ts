export {};

enum LayoutEnum {
  404 = '404',
  normal = 'normal'
}
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 布局组件
    layout: LayoutEnum
    // 标题
    title: string
    hideMenu: boolean
    // 图标
    icon: string
  }
}
