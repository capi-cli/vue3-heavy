<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script lang="ts" setup>
  import { useGlobSetting } from './hooks/setting';
  import { useTitle } from './hooks/web/useTitle';

  const { shortName } = useGlobSetting();
  useTitle();
</script>

<style>
  #app {
    text-align: center;
  }
</style>
