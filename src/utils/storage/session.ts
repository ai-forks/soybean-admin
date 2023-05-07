import { decrypto, encrypto } from "../crypto";
const storage = import.meta.env.SSR
  ? {
      setItem(key: string, value: string) {},
      getItem(key: string) {
        return undefined;
      },
      clear() {},
      removeItem() {},
    }
  : globalThis.sessionStorage;
function createSessionStorage<T extends StorageInterface.Session = StorageInterface.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypto(value);
    storage.setItem(key as string, json);
  }
  function get<K extends keyof T>(key: K) {
    const json = storage.getItem(key as string);
    let data: T[K] | null = null;
    if (json) {
      try {
        data = decrypto(json);
      } catch {
        // 防止解析失败
      }
    }
    return data;
  }
  function remove(key: keyof T) {
    storage.removeItem(key as string);
  }
  function clear() {
    storage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const sessionStg = createSessionStorage();
globalThis.sessionStg = sessionStg;