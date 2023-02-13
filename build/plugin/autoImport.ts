import AutoImport from 'unplugin-auto-import/vite';

export function configAutoImport() {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, 
      /\.md$/, 
    ],

    imports: [
      // 预设
      'vue',
      'vue-router',
      'vue/macros',
      '@vueuse/core',
      // 自定义
      {
        // '[包名]': [
        //   import { importNames } from '包名'
        //   '[importNames]',
        //   别名 import { from as alias } from "包名"
        //   ['[from]', '[alias]'],
        // ],
        axios: [
          ['default', 'axios'], // import { default as axios } from 'axios',
        ],
      },
    ],

    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },

    // https://github.com/antfu/unplugin-auto-import/pull/23/
    resolvers: [
      /* ... */
    ],

    dirs: ['./src/composables'],

    dts: true,

    vueTemplate: true,
  });
}
