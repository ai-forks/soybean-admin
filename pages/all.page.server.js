import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { createApp } from "@/main";
export { render };

console.info("env", import.meta.env.MODE, import.meta.env.SSR);

async function render(pageContext) {
  const { Page, urlPathname } = pageContext;
  const { app, appLoading, router } = createApp({ Page: Page });
  router.push(pageContext.urlPathname);
  await router.isReady();
  const appHtml = await renderToString(app);
  //const appLoadingHtml = await renderToString(appLoading); //${dangerouslySkipEscape(appHtml)}
  return escapeInject`<!DOCTYPE html>
    <html>
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
