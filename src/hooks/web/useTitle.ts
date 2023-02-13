import { watch, unref } from 'vue';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '@/hooks/setting';
import { useRouter } from 'vue-router';

/**
 * 监听页面变化,动态更改网站标题
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);

      // if (route.name === REDIRECT_NAME) {
      //   return;
      // }

      const tTitle = route?.meta?.title;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
