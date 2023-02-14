import Components from 'unplugin-vue-components/vite';

export function configComponents() {
  return Components({
    dts: './types/components.d.ts',
    directoryAsNamespace: true,
    resolvers: [],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
  });
}
