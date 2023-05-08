import type { Router } from "vue-router";
import { useTitle } from "@vueuse/core";
import { createPermissionGuard } from "./permission";
import { window } from "@/adapter";
import { t } from "@/locales";
/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 设置document title
    useTitle(t(to.meta.title));
    // 结束 loadingBar
    window.$loadingBar?.finish();
    if (!import.meta.env.SSR) {
      globalThis.document.querySelector("#app-loading")?.remove();
    }
  });
}
