import { defineConfig, loadEnv } from "vite";
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins, viteDefine } from "./build";
import { getServiceEnvConfig } from "./.env-config";
import path from "path";

export default defineConfig((configEnv) => {
  const viteEnv: any = loadEnv(configEnv.mode, process.cwd()); // as unknown as ImportMetaEnv;

  const rootPath = path.resolve(__dirname);
  const srcPath = path.join(rootPath, "src");
  //console.info("vite env", viteEnv);
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      /*       alias: {
        "~": rootPath,
        "@": srcPath,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      }, */
      alias: [
        {
          find: "~",
          replacement: rootPath,
        },
        {
          find: "@",
          replacement: srcPath,
        },
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
        {
          find: "naive-ui",
          replacement: "naive-ui/dist",
        },
      ],
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`,
        },
      },
    },
    server: {
      https: false,
      host: "0.0.0.0",
      port: 3000,
      open: false,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    optimizeDeps: {
      include: [
        "vue",
        "naive-ui",
        "@antv/data-set",
        "@antv/g2",
        "@better-scroll/core",
        "echarts",
        "swiper",
        "swiper/vue",
        //"vditor",
        //"wangeditor",
        //"xgplayer",
      ],
    },
    ssr: {
      //external: ["naive-ui"],
      //format: "cjs"
    },
    build: {
      //target: "modules",
      outDir: "dist",
      //publicDir: "public",
      minify: false,
      cssMinify: true,
      //manifest: true,
      ssrManifest: true,
      //ssr: true,
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
        //ignoreGlobal: true,
        transformMixedEsModules: true,
        esmExternals: true,
        //defaultIsModuleExports: false,
        sourceMap: false,
        //include: [/node_modules/],
        //extensions: [".js", ".cjs", ".mjs"],
      },
      /*    modulePreload: {
        polyfill: true,
        resolveDependencies: (url: string, deps: string[], { hostId, hostType }) => {
          return deps.filter((dep) => ["vue", "vue-router", "pinia", "naive-ui"].includes(dep));
        }, 
      },*/
    },
  };
});
