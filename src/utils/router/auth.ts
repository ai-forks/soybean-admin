/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(routes: AuthRoute.Route[], permission: Auth.RoleType) {
  return routes.map((route) => filterAuthRouteByUserPermission(route, permission)).flat(1);
}
/**
 * 根据用户权限,过滤需要登录的路由
 * @param routes
 * @returns
 */
export function filterAuthRouteNoAuth(routes: AuthRoute.Route[]) {
  return <AuthRoute.Route[]>routes.filter((route) => {
    if (route.meta.requiresAuth == true) return false;
    if (route.children && route.children.length > 0) route.children = filterAuthRouteNoAuth(route.children);
    if (!route.children || route.children.length < 1) {
      if (["basic"].includes(route.component)) return false;
    }
    return true;
  });
}
/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(route: AuthRoute.Route, permission: Auth.RoleType): AuthRoute.Route[] {
  const filterRoute = { ...route };
  const hasPermission =
    !route.meta.permissions || permission === "super" || route.meta.permissions.includes(permission);

  if (filterRoute.children) {
    const filterChildren = filterRoute.children
      .map((item) => filterAuthRouteByUserPermission(item, permission))
      .flat(1);
    Object.assign(filterRoute, { children: filterChildren });
  }
  return hasPermission ? [filterRoute] : [];
}
