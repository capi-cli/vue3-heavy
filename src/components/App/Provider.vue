<script lang="ts">
  import { createAppProviderContext } from './useAppContext';
  import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
  import { useAppStore } from '@/store/modules/app';

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    setup(_, { slots }) {
      const isMobile = ref(false);
      const isSetState = ref(false);

      const appStore = useAppStore();

      // 监听屏幕变化
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
        handleRestoreState();
      });


      // 注入全局变量
      createAppProviderContext({ isMobile });

      /**
       * 用于在更改前维护状态
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true;
            const {
              menuSetting: {
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = appStore.getProjectConfig;
            appStore.setProjectConfig({
              menuSetting: {
                split: false,
              },
            });
            appStore.setBeforeMiniInfo({ menuCollapsed,  menuSplit });
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false;
            const { menuCollapsed,  menuSplit } = appStore.getBeforeMiniInfo;
            appStore.setProjectConfig({
              menuSetting: {
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            });
          }
        }
      }
      return () => slots.default?.();
    },
  });
</script>
