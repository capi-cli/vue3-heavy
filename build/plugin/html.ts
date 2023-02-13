/**
 * 用于HTML压缩和ejs模板能力
 * https://github.com/anncwb/vite-plugin-html
 */
import { createHtmlPlugin } from 'vite-plugin-html';
import { GLOB_CONFIG_FILE_NAME } from '../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${new Date().getTime()}`;
  };

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // 将数据注入ejs模板
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // 嵌入生成的app.config.js文件
      tags: isBuild
        ? [
          {
            tag: 'script',
            attrs: {
              src: getAppConfigSrc(),
            },
          },
        ]
        : [],
    },
  })
  return htmlPlugin as any;
}
