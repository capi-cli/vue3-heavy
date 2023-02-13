<template>
  <div flex cursor-point items-center transition-all-200 h-44px pl-20px>
    <div text-20px font-700 :style="`color: var(--${shortName}-color-primary)`" v-show="showTitle"> LOGO </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting';

  withDefaults(
    defineProps<{
      showTitle?: boolean;
    }>(),
    {
      showTitle: true,
    },
  );

  const { shortName } = useGlobSetting();
</script>
