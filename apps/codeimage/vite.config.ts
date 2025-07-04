import {vanillaExtractPlugin} from '@codeimage/vanilla-extract';
import {nodeTypes} from '@mdx-js/mdx';
import mdx from '@mdx-js/rollup';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import {defineConfig, Plugin, UserConfigExport} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import {withStaticVercelPreview} from '../../scripts/vercel-output-build';

const config: UserConfigExport = defineConfig(({mode}) => ({
  base: './',
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-jsx',
        providerImportSource: 'solid-mdx',
        rehypePlugins: [rehypeSlug, [rehypeRaw, {passThrough: nodeTypes}]],
      }),
      enforce: 'pre',
    },
    vanillaExtractPlugin(),
    solidPlugin({
      extensions: ['.mdx', '.tsx', '.ts'],
    }),
    // VitePWA(pwaOptions),
    tsconfigPaths(),
    {
      name: 'parse-environment-variables',

      configResolved(resolvedConfig) {
        const config = resolvedConfig as Omit<typeof resolvedConfig, 'env'> & {
          env: (typeof resolvedConfig)['env'];
        };
        const env = config.env;
        config.env = Object.keys(env).reduce((acc, key) => {
          let parsed = config.env[key];
          try {
            parsed = JSON.parse(config.env[key]);
          } catch {}
          return {
            ...acc,
            [key]: parsed,
          };
        }, {});
      },
    },
    withStaticVercelPreview() as unknown as Plugin,
  ],
  server: {
    strictPort: true,
    port: 4200,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: false,
    minify: true,
    polyfillModulePreload: false,
    polyfillDynamicImport: false,
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
}));

export default config;
