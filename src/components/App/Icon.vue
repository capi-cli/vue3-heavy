<template>
  <ElIcon>
    <Icon v-if="type === 'normal'" v-bind="$attrs" :width="size" :height="size" :icon="name" />
    <svg
      v-else
      :class="[$attrs.class, 'svg-icon-spin']"
      :style="`width:${size}px;height:${size}px;`"
      aria-hidden="true"
    >
      <use :xlink:href="name" />
    </svg>
  </ElIcon>
</template>
<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  // 图标：http://icon-sets.iconify.design/carbon/

  withDefaults(
    defineProps<{
      name: string;
      size?: number;
      type?: 'normal' | 'svg';
    }>(),
    {
      size: 33,
      type: 'normal',
    },
  );

  // const
</script>
<style lang="scss" scoped>
  .svg-icon-spin {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
</style>
