import { RouteMeta } from 'vue-router'

type PathConfig = {
  [x:string]: Partial<RouteMeta>
}
export const RoutePathConfig:PathConfig  = {
  'hi': {
    title: "河洛",
    icon: "carbon:apps"
  },
  'example': {
    title: "用例",
    icon: "carbon:align-box-top-left"
  }
}