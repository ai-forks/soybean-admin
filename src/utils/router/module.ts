/**
 * 权限路由排序
 * @param routes - 权限路由
 */
export function sortRoutes(routes: AuthRoute.Route[]) {
  return routes
    .sort((next, pre) => Number(next.meta?.order) - Number(pre.meta?.order))
    .map((i) => {
      if (i.children) sortRoutes(i.children);
      return i;
    });
}

/**
 * 处理全部导入的路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: AuthRoute.RouteModule) {
  const routes: AuthRoute.Route[] = [];
  const ssr = import.meta.env.SSR;
  Object.keys(modules).forEach((key) => {
    const item = modules[key].default;
    if (item) {
      if (item instanceof Array) {
        item.forEach((sitem) => {
          if (sitem.path) {
            ssr ? !sitem.meta.requiresAuth && routes.push(sitem) : routes.push(sitem);
          }
        });
      } else if (item.path) {
        ssr ? !item.meta.requiresAuth && routes.push(item) : routes.push(item);
      }
    } else {
      console.error(`路由模块解析出错: key = ${key}`);
    }
  });

  return sortRoutes(routes);
}
