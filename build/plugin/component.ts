import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configComponents() {
  return Components({
    dts: './types/components.d.ts',
    directoryAsNamespace: true,
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass',
      }),
    ],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\Formily\/components[\\/]/],
  });
}
