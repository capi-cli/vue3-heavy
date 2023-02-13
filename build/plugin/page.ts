import Pages from 'vite-plugin-pages';

export function configPagePlugin() {
  return Pages({
    exclude: ['**/components/*.vue']
  });
}
