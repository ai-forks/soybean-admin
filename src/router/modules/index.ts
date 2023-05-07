import * as utils from "@/utils";

//import about from "./about";
//import dashboard from "./dashboard";
let modules: { [key: string]: any } = {};
/* function addModules(...list: any[]) {
  list.forEach((module) => {
    modules[module.path] = {
      default: module,
    };
  });
}
addModules(about, dashboard); */
modules = import.meta.glob("./**/*.ts", { eager: true }) as AuthRoute.RouteModule;
export const routes = utils.handleModuleRoutes(modules);
//import.meta.env.SSR || console.info("routers", routes, modules);