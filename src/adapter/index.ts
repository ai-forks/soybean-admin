const ssr = import.meta.env.SSR;

const storage = {
  setItem(key: string, value: string) {},
  getItem(key: string) {
    return "";
  },
  clear() {},
  removeItem() {},
};
type Window = { console; [key: string]: any } & globalThis.Window;
export const localStorage = ssr ? storage : globalThis.localStorage;
export const sessionStorage = ssr ? storage : globalThis.sessionStorage;
export const document: any = ssr ? {} : globalThis.document;
export const location: any = ssr ? {} : globalThis.location;
export const navigator: any = ssr ? {} : globalThis.navigator;
export const console = globalThis.console;

export const window: Window = ssr
  ? globalThis
  : <any>{
      document,
      location,
      navigator,
      localStorage,
      sessionStorage,
      console,
    };
