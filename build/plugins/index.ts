import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "@unocss/vite";
import progress from "vite-plugin-progress";
//import pageRoute from "@soybeanjs/vite-plugin-vue-page-route";
import { pageRoute } from "@ai-lion/vite-plugin-vue-page-route";
import unplugin from "./unplugin";
import mock from "./mock";
import visualizer from "./visualizer";
import compress from "./compress";
import pwa from "./pwa";
import ssr from "vite-plugin-ssr/plugin";
import { viteStaticCopy } from "vite-plugin-static-copy"; //引入插件
import os from "os";
/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const isProd = viteEnv.VITE_SERVICE_ENV == "prod";
  const isDev = viteEnv.VITE_SERVICE_ENV == "dev";
  console.info("init plugins env", viteEnv.VITE_SERVICE_ENV);
  const plugins: any[] = [
    vue(), //
    vueJsx(),
    ...unplugin(viteEnv),
    unocss(),
    //progress(),
    pageRoute({
      //
      pageDir: "src/views", // 默认
      pageGlobs: ["**/**.{vue,tsx,jsx}", "!**/components/**"], // 默认
      //routeDts: "src/typings/page-route.d.ts", // 默认
      //routeModuleDir: "src/router/modules", // 默认
      //routeModuleExt: "ts", // 默认
      //routeModuleType: "AuthRoute.Route", // 默认
      //name.replace(/^_([a-zA-Z]|[0-9]|$)+_*/, ""), // 默认
      lazyImport: (_name) => true, // 默认
      //onRouteModuleGenerate: (name) => !name.includes("_builtin"), // 对于系统内置路由不生成路由模块, 其他的都生成
    }),
  ];
  if (isDev) {
    plugins.push(mock);
  }
  if (viteEnv.VITE_VISUALIZER === "Y") {
    plugins.push(visualizer as any as PluginOption);
  }
  if (viteEnv.VITE_COMPRESS === "Y") {
    plugins.push(compress(viteEnv));
  }
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    plugins.push(pwa());
  }
  if (viteEnv.VITE_SSR == "Y") {
    console.info("====== enable ssr =======");
    plugins.push(
      ssr({
        prerender: {
          parallel: Math.max(os.cpus.length - 1, 1),
        },
        includeAssetsImportedByServer: true,
      }),
    );
  }
  plugins.push(
    viteStaticCopy({
      targets: [
        {
          src: "package.json",
          dest: "../",
          rename: "package.json",
          transform: (content: string, filename: string) => {
            content = content.replace(/"author":\s*\{[^\}]+\}\s*,/, "");
            content = content.replace(
              /"scripts":\s*\{[^\}]+\}\s*,/,
              `"script": { "start": "cross-env VITE_SERVICE_ENV=prod NODE_ENV=production  node server.js" },`,
            );
            content = content.replace(/"devDependencies":\s*\{[^\}]+\}\s*,/, "");
            content = content.replace(/"pnpm":\s*\{[^\}]+\}\s*,/, "");
            content = content.replace(/"lint-staged":\s*\{[^\}]+\}\s*,/, "");
            return content;
          },
        },
        {
          src: "server.js",
          dest: "../",
          transform: (content, file) => {
            content = content.replace("dist/client", "client");
            return content;
          },
        },
      ],
    }),
  );
  return plugins;
}
