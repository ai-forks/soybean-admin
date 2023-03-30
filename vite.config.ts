import { defineConfig, loadEnv } from "vite";
import {
	createViteProxy,
	getRootPath,
	getSrcPath,
	setupVitePlugins,
	viteDefine,
} from "./build";
import { getServiceEnvConfig } from "./.env-config";

export default defineConfig((configEnv) => {
	const viteEnv = loadEnv(
		configEnv.mode,
		process.cwd()
	) as unknown as ImportMetaEnv;
	const rootPath = getRootPath();
	const srcPath = getSrcPath();

	const envConfig = getServiceEnvConfig(viteEnv);
	const { VITE_USE_MOCK, VITE_PROXY } = viteEnv;

	return {
		base: viteEnv.VITE_BASE_URL,
		resolve: {
			alias: {
				"~": rootPath,
				"@": srcPath,
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
			},
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
			host: "0.0.0.0",
			port: 3200,
			open: false,
			proxy: createViteProxy(VITE_PROXY),
		},
		optimizeDeps: {
			include: [
				"@antv/data-set",
				"@antv/g2",
				"@better-scroll/core",
				"echarts",
				"swiper",
				"swiper/vue",
				"vditor",
				"wangeditor",
				"xgplayer",
			],
		},
		build: {
			reportCompressedSize: false,
			sourcemap: false,
			commonjsOptions: {
				ignoreTryCatch: false,
			},
		},
	};
});
