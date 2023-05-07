import * as vue from "vue";
import AppLoading from "./components/common/app-loading.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupI18n } from "./locales";
export function createApp({ Page }: { Page: any }) {
  const ssr = import.meta.env.SSR;
  const isDev = import.meta.env.DEV;
  //console.info("==== env ssr", import.meta.env.SSR, "isdev=" + import.meta.env.DEV);
  // import assets: js、css
  setupAssets();
/*   if (!ssr) {
    const appLoading = vue.createApp(AppLoading);
    appLoading.mount("#appLoading");
  } */
  const appLoading =  ssr ? vue.createSSRApp(AppLoading) : vue.createApp(AppLoading);
  //appLoading.mount("#appLoading");

  const app = ssr ? vue.createSSRApp(Page) : vue.createApp(Page);
  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  const router = setupRouter(app);
  if(!ssr) globalThis.router = router;
  setupI18n(app);
  /* 
  // mount app
  router.isReady().then(() => {
    app.mount("#app");
  }); */
  return {
    app,
    appLoading,
    router,
  };
}

//setupApp();
