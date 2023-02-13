<template>
  <div
    :class="[`${shortName}-dark-toggle`, isDark ? `${shortName}-dark-toggle-dark` : '']"
    @click="() => toggleDark()"
  >
    <div :class="`${shortName}-dark-toggle-inner`"></div>
    <AppIcon type="svg" :size="24" name="#icon-sun" />
    <AppIcon type="svg" :size="24" name="#icon-moon" />
  </div>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting';

  const { shortName } = useGlobSetting();
</script>
<style lang="scss" scoped></style>
