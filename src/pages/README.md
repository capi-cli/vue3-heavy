## 路由配置

路由实现基于 [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages)
需要在@/enums/pageEnum.ts 里新增枚举

## 如何新增一个页面
1. 在 src/pages/**文件夹内新增一个.vue文件
示例
```
<template>
</template>

<script lang="ts" setup name="xxx"><script>

<route lang="yaml">
meta:
  title: '标题'
  layout: //默认为default, 可选 layouts文件夹下的404/normal
  auth: //是否需要token 默认为true
</route>

```
2. 如果需要一级导航菜单的页面，在src/router/config.ts内修改配置
3. 每一个文件夹对应一个顶级菜单
4. src/pages/**/components/下的vue文件会被视作组件，不会生成路由