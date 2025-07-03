// vite.config.ts
import { vanillaExtractPlugin } from "file:///C:/Users/peropero/Desktop/projects/codeimage/packages/vanilla-extract/dist/index.mjs";
import { nodeTypes } from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/@mdx-js+mdx@3.0.0/node_modules/@mdx-js/mdx/index.js";
import mdx from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/@mdx-js+rollup@3.0.0_rollup@4.21.3/node_modules/@mdx-js/rollup/index.js";
import rehypeRaw from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/rehype-raw@7.0.0/node_modules/rehype-raw/index.js";
import rehypeSlug from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/rehype-slug@6.0.0/node_modules/rehype-slug/index.js";
import { defineConfig } from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/vite@5.4.5_@types+node@20.12.7_sass@1.61.0_terser@5.17.1/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/vite-plugin-solid@2.10.2_solid-js@1.8.22_vite@5.4.5_@types+node@20.12.7_sass@1.61.0_terser@5.17.1_/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import tsconfigPaths from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_typescript@5.3.2_vite@5.4.5_@types+node@20.12.7_sass@1.61.0_terser@5.17.1_/node_modules/vite-tsconfig-paths/dist/index.js";

// ../../scripts/vercel-output-build.ts
import chalk from "file:///C:/Users/peropero/Desktop/projects/codeimage/node_modules/.pnpm/chalk@5.1.2/node_modules/chalk/source/index.js";
import { cpSync, existsSync, mkdirSync, rmdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
var ENABLE_VERCEL_BUILD = process.env.ENABLE_VERCEL_BUILD === "true";
function withStaticVercelPreview() {
  let config2;
  let command;
  function getVercelDir() {
    return resolve(join(config2.root, ".vercel"));
  }
  const configuration = {
    version: 3,
    routes: [
      {
        handle: "filesystem"
      },
      {
        check: true,
        src: "/(.*)",
        dest: "/"
      }
    ]
  };
  return {
    name: "vercel-static-build",
    enforce: "post",
    config: (userConfig, env) => {
      if (env.command === "build") {
        command = env.command;
      }
    },
    configResolved(resolvedConfig) {
      config2 = resolvedConfig;
    },
    buildStart() {
      const vercelDir = getVercelDir();
      if (existsSync(vercelDir)) {
        rmdirSync(vercelDir, { recursive: true });
      }
    },
    closeBundle() {
      console.log();
      if (!ENABLE_VERCEL_BUILD || command !== "build") {
        console.log(chalk.cyan("Skipping Vercel build."));
        return;
      }
      console.log(chalk.cyan("Building for Vercel output..."));
      const vercelDir = getVercelDir();
      const outputDir = join(vercelDir, "output");
      mkdirSync(join(vercelDir, "output"), { recursive: true });
      writeFileSync(
        join(outputDir, "config.json"),
        JSON.stringify(configuration),
        { encoding: "utf-8" }
      );
      const distFolder = resolve(join(config2.root, "dist"));
      cpSync(distFolder, join(outputDir, "static"), { recursive: true });
      console.log(chalk.green("Vercel output generated successfully."));
    }
  };
}

// vite.config.ts
var config = defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-jsx",
        providerImportSource: "solid-mdx",
        rehypePlugins: [rehypeSlug, [rehypeRaw, { passThrough: nodeTypes }]]
      }),
      enforce: "pre"
    },
    vanillaExtractPlugin(),
    solidPlugin({
      extensions: [".mdx", ".tsx", ".ts"]
    }),
    // VitePWA(pwaOptions),
    tsconfigPaths(),
    {
      name: "parse-environment-variables",
      configResolved(resolvedConfig) {
        const config2 = resolvedConfig;
        const env = config2.env;
        config2.env = Object.keys(env).reduce((acc, key) => {
          let parsed = config2.env[key];
          try {
            parsed = JSON.parse(config2.env[key]);
          } catch {
          }
          return {
            ...acc,
            [key]: parsed
          };
        }, {});
      }
    },
    withStaticVercelPreview()
  ],
  server: {
    strictPort: true,
    port: 4200,
    watch: {
      usePolling: true
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    sourcemap: false,
    minify: true,
    polyfillModulePreload: false,
    polyfillDynamicImport: false,
    cssCodeSplit: true,
    reportCompressedSize: true
  }
}));
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vc2NyaXB0cy92ZXJjZWwtb3V0cHV0LWJ1aWxkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVyb3Blcm9cXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFxjb2RlaW1hZ2VcXFxcYXBwc1xcXFxjb2RlaW1hZ2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlcm9wZXJvXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcY29kZWltYWdlXFxcXGFwcHNcXFxcY29kZWltYWdlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZXJvcGVyby9EZXNrdG9wL3Byb2plY3RzL2NvZGVpbWFnZS9hcHBzL2NvZGVpbWFnZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7dmFuaWxsYUV4dHJhY3RQbHVnaW59IGZyb20gJ0Bjb2RlaW1hZ2UvdmFuaWxsYS1leHRyYWN0JztcbmltcG9ydCB7bm9kZVR5cGVzfSBmcm9tICdAbWR4LWpzL21keCc7XG5pbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJztcbmltcG9ydCByZWh5cGVSYXcgZnJvbSAncmVoeXBlLXJhdyc7XG5pbXBvcnQgcmVoeXBlU2x1ZyBmcm9tICdyZWh5cGUtc2x1Zyc7XG5pbXBvcnQge2RlZmluZUNvbmZpZywgUGx1Z2luLCBVc2VyQ29uZmlnRXhwb3J0fSBmcm9tICd2aXRlJztcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCB7d2l0aFN0YXRpY1ZlcmNlbFByZXZpZXd9IGZyb20gJy4uLy4uL3NjcmlwdHMvdmVyY2VsLW91dHB1dC1idWlsZCc7XG5cbmNvbnN0IGNvbmZpZzogVXNlckNvbmZpZ0V4cG9ydCA9IGRlZmluZUNvbmZpZygoe21vZGV9KSA9PiAoe1xuICBiYXNlOiAnLi8nLFxuICBwbHVnaW5zOiBbXG4gICAge1xuICAgICAgLi4ubWR4KHtcbiAgICAgICAganN4OiB0cnVlLFxuICAgICAgICBqc3hJbXBvcnRTb3VyY2U6ICdzb2xpZC1qc3gnLFxuICAgICAgICBwcm92aWRlckltcG9ydFNvdXJjZTogJ3NvbGlkLW1keCcsXG4gICAgICAgIHJlaHlwZVBsdWdpbnM6IFtyZWh5cGVTbHVnLCBbcmVoeXBlUmF3LCB7cGFzc1Rocm91Z2g6IG5vZGVUeXBlc31dXSxcbiAgICAgIH0pLFxuICAgICAgZW5mb3JjZTogJ3ByZScsXG4gICAgfSxcbiAgICB2YW5pbGxhRXh0cmFjdFBsdWdpbigpLFxuICAgIHNvbGlkUGx1Z2luKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1keCcsICcudHN4JywgJy50cyddLFxuICAgIH0pLFxuICAgIC8vIFZpdGVQV0EocHdhT3B0aW9ucyksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIHtcbiAgICAgIG5hbWU6ICdwYXJzZS1lbnZpcm9ubWVudC12YXJpYWJsZXMnLFxuXG4gICAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xuICAgICAgICBjb25zdCBjb25maWcgPSByZXNvbHZlZENvbmZpZyBhcyBPbWl0PHR5cGVvZiByZXNvbHZlZENvbmZpZywgJ2Vudic+ICYge1xuICAgICAgICAgIGVudjogKHR5cGVvZiByZXNvbHZlZENvbmZpZylbJ2VudiddO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlbnYgPSBjb25maWcuZW52O1xuICAgICAgICBjb25maWcuZW52ID0gT2JqZWN0LmtleXMoZW52KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgbGV0IHBhcnNlZCA9IGNvbmZpZy5lbnZba2V5XTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShjb25maWcuZW52W2tleV0pO1xuICAgICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW2tleV06IHBhcnNlZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9LCB7fSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgd2l0aFN0YXRpY1ZlcmNlbFByZXZpZXcoKSBhcyB1bmtub3duIGFzIFBsdWdpbixcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBwb3J0OiA0MjAwLFxuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgIH0sXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBtaW5pZnk6IHRydWUsXG4gICAgcG9seWZpbGxNb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICBwb2x5ZmlsbER5bmFtaWNJbXBvcnQ6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgfSxcbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZXJvcGVyb1xcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXGNvZGVpbWFnZVxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZXJvcGVyb1xcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXGNvZGVpbWFnZVxcXFxzY3JpcHRzXFxcXHZlcmNlbC1vdXRwdXQtYnVpbGQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3Blcm9wZXJvL0Rlc2t0b3AvcHJvamVjdHMvY29kZWltYWdlL3NjcmlwdHMvdmVyY2VsLW91dHB1dC1idWlsZC50c1wiO2ltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQge2NwU3luYywgZXhpc3RzU3luYywgbWtkaXJTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmN9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHtqb2luLCByZXNvbHZlfSBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHtDb25maWdFbnYsIFBsdWdpbiwgUmVzb2x2ZWRDb25maWd9IGZyb20gJ3ZpdGUnO1xuXG5jb25zdCBFTkFCTEVfVkVSQ0VMX0JVSUxEID0gcHJvY2Vzcy5lbnYuRU5BQkxFX1ZFUkNFTF9CVUlMRCA9PT0gJ3RydWUnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgLnZlcmNlbC9vdXRwdXQgZm9sZGVyIHdpdGggdGhlIHN0YXRpYyBhc3NldHMgZnJvbSB0aGUgZ2VuZXJhdGVkIGJ1aWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aFN0YXRpY1ZlcmNlbFByZXZpZXcoKTogUGx1Z2luIHtcbiAgbGV0IGNvbmZpZzogUmVzb2x2ZWRDb25maWc7XG4gIGxldCBjb21tYW5kOiBDb25maWdFbnZbJ2NvbW1hbmQnXTtcblxuICBmdW5jdGlvbiBnZXRWZXJjZWxEaXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVzb2x2ZShqb2luKGNvbmZpZy5yb290LCAnLnZlcmNlbCcpKTtcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSB7XG4gICAgdmVyc2lvbjogMyxcbiAgICByb3V0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgaGFuZGxlOiAnZmlsZXN5c3RlbScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGVjazogdHJ1ZSxcbiAgICAgICAgc3JjOiAnLyguKiknLFxuICAgICAgICBkZXN0OiAnLycsXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmVyY2VsLXN0YXRpYy1idWlsZCcsXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxuXG4gICAgY29uZmlnOiAodXNlckNvbmZpZywgZW52KSA9PiB7XG4gICAgICBpZiAoZW52LmNvbW1hbmQgPT09ICdidWlsZCcpIHtcbiAgICAgICAgY29tbWFuZCA9IGVudi5jb21tYW5kO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29uZmlnUmVzb2x2ZWQocmVzb2x2ZWRDb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHJlc29sdmVkQ29uZmlnO1xuICAgIH0sXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGNvbnN0IHZlcmNlbERpciA9IGdldFZlcmNlbERpcigpO1xuICAgICAgaWYgKGV4aXN0c1N5bmModmVyY2VsRGlyKSkge1xuICAgICAgICBybWRpclN5bmModmVyY2VsRGlyLCB7cmVjdXJzaXZlOiB0cnVlfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCk7IC8vIEVtcHR5IGxvZ1xuICAgICAgaWYgKCFFTkFCTEVfVkVSQ0VMX0JVSUxEIHx8IGNvbW1hbmQgIT09ICdidWlsZCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbGsuY3lhbignU2tpcHBpbmcgVmVyY2VsIGJ1aWxkLicpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coY2hhbGsuY3lhbignQnVpbGRpbmcgZm9yIFZlcmNlbCBvdXRwdXQuLi4nKSk7XG4gICAgICBjb25zdCB2ZXJjZWxEaXIgPSBnZXRWZXJjZWxEaXIoKTtcbiAgICAgIGNvbnN0IG91dHB1dERpciA9IGpvaW4odmVyY2VsRGlyLCAnb3V0cHV0Jyk7XG4gICAgICBta2RpclN5bmMoam9pbih2ZXJjZWxEaXIsICdvdXRwdXQnKSwge3JlY3Vyc2l2ZTogdHJ1ZX0pO1xuICAgICAgd3JpdGVGaWxlU3luYyhcbiAgICAgICAgam9pbihvdXRwdXREaXIsICdjb25maWcuanNvbicpLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uKSxcbiAgICAgICAge2VuY29kaW5nOiAndXRmLTgnfSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRpc3RGb2xkZXIgPSByZXNvbHZlKGpvaW4oY29uZmlnLnJvb3QsICdkaXN0JykpO1xuICAgICAgY3BTeW5jKGRpc3RGb2xkZXIsIGpvaW4ob3V0cHV0RGlyLCAnc3RhdGljJyksIHtyZWN1cnNpdmU6IHRydWV9KTtcbiAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmdyZWVuKCdWZXJjZWwgb3V0cHV0IGdlbmVyYXRlZCBzdWNjZXNzZnVsbHkuJykpO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVEsNEJBQTJCO0FBQ3RaLFNBQVEsaUJBQWdCO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUSxvQkFBNkM7QUFDckQsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxtQkFBbUI7OztBQ1BrVixPQUFPLFdBQVc7QUFDOVgsU0FBUSxRQUFRLFlBQVksV0FBVyxXQUFXLHFCQUFvQjtBQUN0RSxTQUFRLE1BQU0sZUFBYztBQUc1QixJQUFNLHNCQUFzQixRQUFRLElBQUksd0JBQXdCO0FBS3pELFNBQVMsMEJBQWtDO0FBQ2hELE1BQUlBO0FBQ0osTUFBSTtBQUVKLFdBQVMsZUFBdUI7QUFDOUIsV0FBTyxRQUFRLEtBQUtBLFFBQU8sTUFBTSxTQUFTLENBQUM7QUFBQSxFQUM3QztBQUVBLFFBQU0sZ0JBQWdCO0FBQUEsSUFDcEIsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLE1BQ047QUFBQSxRQUNFLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUVULFFBQVEsQ0FBQyxZQUFZLFFBQVE7QUFDM0IsVUFBSSxJQUFJLFlBQVksU0FBUztBQUMzQixrQkFBVSxJQUFJO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlLGdCQUFnQjtBQUM3QixNQUFBQSxVQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsYUFBYTtBQUNYLFlBQU0sWUFBWSxhQUFhO0FBQy9CLFVBQUksV0FBVyxTQUFTLEdBQUc7QUFDekIsa0JBQVUsV0FBVyxFQUFDLFdBQVcsS0FBSSxDQUFDO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQ1osY0FBUSxJQUFJO0FBQ1osVUFBSSxDQUFDLHVCQUF1QixZQUFZLFNBQVM7QUFDL0MsZ0JBQVEsSUFBSSxNQUFNLEtBQUssd0JBQXdCLENBQUM7QUFDaEQ7QUFBQSxNQUNGO0FBQ0EsY0FBUSxJQUFJLE1BQU0sS0FBSywrQkFBK0IsQ0FBQztBQUN2RCxZQUFNLFlBQVksYUFBYTtBQUMvQixZQUFNLFlBQVksS0FBSyxXQUFXLFFBQVE7QUFDMUMsZ0JBQVUsS0FBSyxXQUFXLFFBQVEsR0FBRyxFQUFDLFdBQVcsS0FBSSxDQUFDO0FBQ3REO0FBQUEsUUFDRSxLQUFLLFdBQVcsYUFBYTtBQUFBLFFBQzdCLEtBQUssVUFBVSxhQUFhO0FBQUEsUUFDNUIsRUFBQyxVQUFVLFFBQU87QUFBQSxNQUNwQjtBQUVBLFlBQU0sYUFBYSxRQUFRLEtBQUtBLFFBQU8sTUFBTSxNQUFNLENBQUM7QUFDcEQsYUFBTyxZQUFZLEtBQUssV0FBVyxRQUFRLEdBQUcsRUFBQyxXQUFXLEtBQUksQ0FBQztBQUMvRCxjQUFRLElBQUksTUFBTSxNQUFNLHVDQUF1QyxDQUFDO0FBQUEsSUFDbEU7QUFBQSxFQUNGO0FBQ0Y7OztBRDdEQSxJQUFNLFNBQTJCLGFBQWEsQ0FBQyxFQUFDLEtBQUksT0FBTztBQUFBLEVBQ3pELE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQO0FBQUEsTUFDRSxHQUFHLElBQUk7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLHNCQUFzQjtBQUFBLFFBQ3RCLGVBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLGFBQWEsVUFBUyxDQUFDLENBQUM7QUFBQSxNQUNuRSxDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EscUJBQXFCO0FBQUEsSUFDckIsWUFBWTtBQUFBLE1BQ1YsWUFBWSxDQUFDLFFBQVEsUUFBUSxLQUFLO0FBQUEsSUFDcEMsQ0FBQztBQUFBO0FBQUEsSUFFRCxjQUFjO0FBQUEsSUFDZDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BRU4sZUFBZSxnQkFBZ0I7QUFDN0IsY0FBTUMsVUFBUztBQUdmLGNBQU0sTUFBTUEsUUFBTztBQUNuQixRQUFBQSxRQUFPLE1BQU0sT0FBTyxLQUFLLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxRQUFRO0FBQ2pELGNBQUksU0FBU0EsUUFBTyxJQUFJLEdBQUc7QUFDM0IsY0FBSTtBQUNGLHFCQUFTLEtBQUssTUFBTUEsUUFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQ3JDLFFBQVE7QUFBQSxVQUFDO0FBQ1QsaUJBQU87QUFBQSxZQUNMLEdBQUc7QUFBQSxZQUNILENBQUMsR0FBRyxHQUFHO0FBQUEsVUFDVDtBQUFBLFFBQ0YsR0FBRyxDQUFDLENBQUM7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLElBQ0Esd0JBQXdCO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixjQUFjO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxFQUN4QjtBQUNGLEVBQUU7QUFFRixJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogWyJjb25maWciLCAiY29uZmlnIl0KfQo=
