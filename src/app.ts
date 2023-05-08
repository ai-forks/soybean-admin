import { createApp } from "./main";
import App from "./App.vue";

(async () => {
  let config: Config.Config = await fetch("/config")
    .then((res) => res.json())
    .then((res) => Object.assign({}, res.data || {}))
    .catch((err) => ({
      apiServer: "",
    }));
  Object.defineProperties(import.meta.env, {
    API_SERVER: {
      value: config.apiServer || "",
      writable: false
    },
  });
  let { app, router, appLoading } = createApp({ Page: App });
  appLoading.mount("#appLoading");
  router.isReady().then(() => {
    app.mount("#app");
  });
})();
