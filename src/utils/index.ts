export * from "./common";
export * from "./storage";
export * from "./service";
export * from "./router";
export * from "./form";

import * as storage from "./storage";

export function isLogin() {
  return Boolean(storage.localStg.get("token"));
}
