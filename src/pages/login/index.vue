<template>
  <div> </div>
</template>
<script lang="ts" setup>
  import LoginForm from '@/src/components/loginForm.vue';
  import { useGlobSetting } from '@/hooks/setting';

  const { shortName } = useGlobSetting();
</script>
<style lang="scss"></style>

<route lang="yaml">
meta:
  layout: normal
  auth: false
</route>
