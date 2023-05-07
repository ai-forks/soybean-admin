import { useIconRender } from "@/composables";
import { isLogin } from "./helpers";
/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(routes: AuthRoute.Route[]): App.GlobalMenuOption[] {
  const globalMenu: App.GlobalMenuOption[] = [];
  //const ssr = import.meta.env.SSR;
  const dev = import.meta.env.DEV;

  routes.forEach((route) => {
    //没有登录
    if (!isLogin()) {
      if (route.meta?.requiresAuth == true) return;
    }

    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: App.GlobalMenuOption[] | undefined;
    if (route.children && route.children.length > 0) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }
    if (!menuChildren || menuChildren.length < 1) {//不存在子菜单 
      //不是独立页面类型
      if (["basic"].includes(route.component)) return; 
      menuChildren = undefined;
    }
    const menuItem: App.GlobalMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
      },
      icon: meta.icon,
      localIcon: meta.localIcon,
      children: menuChildren,
    });

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem);
    }
  });

  return globalMenu;
}

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: App.GlobalMenuOption[]) {
  const keys = menus.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1);
  return keys;
}

function getActiveKeyPathsOfMenu(activeKey: string, menu: App.GlobalMenuOption) {
  const keys: string[] = [];
  if (activeKey.startsWith(menu.routeName)) {
    keys.push(menu.routeName);
  }
  if (menu.children) {
    keys.push(...menu.children.map((item) => getActiveKeyPathsOfMenu(activeKey, item as App.GlobalMenuOption)).flat(1));
  }
  return keys;
}

/** 路由不转换菜单 */
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}

/** 给菜单添加可选属性 */
function addPartialProps(config: {
  menu: App.GlobalMenuOption;
  icon?: string;
  localIcon?: string;
  children?: App.GlobalMenuOption[];
}) {
  const { iconRender } = useIconRender();

  const item = { ...config.menu };

  const { icon, localIcon, children } = config;

  if (localIcon) {
    Object.assign(item, { icon: iconRender({ localIcon }) });
  }

  if (icon) {
    Object.assign(item, { icon: iconRender({ icon }) });
  }

  if (children) {
    Object.assign(item, { children });
  }
  return item;
}
