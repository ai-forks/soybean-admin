import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { createApp } from "@/main";
export { render };

const API_SERVER = process.env.API_SERVER || "";
Object.defineProperties(import.meta.env, {
  API_SERVER: {
    value: API_SERVER,
    writable: false,
  },
});
console.info("env==>", import.meta.env.MODE, "API_SERVER=", API_SERVER);

async function render(pageContext) {
  const { Page, urlPathname } = pageContext;
  const { app, appLoading, router } = createApp({
    Page: Page,
  });
  router.push(pageContext.urlPathname);
  await router.isReady();
  const appHtml = await renderToString(app);
  const descriptionTag = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=false">
    <script type="text/javascript">
      const API_SERVER="${API_SERVER}";
      Object.defineProperty(window, "API_SERVER", {value: API_SERVER, writable: false});
    </script>
  `;
  //const appLoadingHtml = await renderToString(appLoading); //${dangerouslySkipEscape(appHtml)}
  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        ${dangerouslySkipEscape(descriptionTag)}
      </head>
      <body>
        <div id="app-loading" style="position: fixed;width: 100%;height: 100%; left: 0;top: 0; z-index: 9999;background:#fff;">
          <div style="display: flex;flex-wrap: wrap; justify-content: center;align-items: center; width:100%; height: 100%; text-align: center;">
              <img src="/loading.gif" />
          </div>
        </div>
        <div id="app">
          ${dangerouslySkipEscape(appHtml)}
        </div>
      </body>
    </html>`;
}
