import { createApp } from "./main";
import App from "./App.vue";

let { app, router, appLoading } = createApp({ Page: App });
appLoading.mount("#appLoading");
router.isReady().then(() => {
  app.mount("#app");
});
