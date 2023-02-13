import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import purgeIcons from 'vite-plugin-purge-icons';
import Unocss from 'unocss/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';
import { configAutoImport } from './autoImport';
import { configPagePlugin } from './page';
import { configComponents } from './component';
import Layouts from 'vite-plugin-vue-layouts';
import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    // 支持setup语法糖定义name: <script setup name="xxxComponent">
    vueSetupExtend(),
  ];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vitePlugins.push(checker({ typescript: true }));

  vitePlugins.push(purgeIcons());

  // vitePlugins.push(configImpPlugin());

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  vitePlugins.push(configPagePlugin());

  vitePlugins.push(Unocss());

  vitePlugins.push(Layouts());

  vitePlugins.push(configComponents());

  vitePlugins.push(configVisualizerConfig());

  vitePlugins.push(configAutoImport());

  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
