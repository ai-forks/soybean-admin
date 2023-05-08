import { createApp } from "@/main";
export { render };

async function render(pageContext) {
  const { Page } = pageContext;
  //const { createApp } = await import("@/main");
  const { app, appLoading, router } = createApp({ Page });
  console.info("env", import.meta.env.MODE);
  appLoading.mount("#appLoading");
  router.isReady().then(() => {
    app.mount("#app");
  });
}
