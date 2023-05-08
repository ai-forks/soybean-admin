import { getServiceEnvConfig } from "~/.env-config";
import { createRequest } from "./request";
//const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);
const API_SERVER = import.meta.env.API_SERVER || globalThis.API_SERVER || "";
let baseURL = import.meta.env.DEV ? "/mock" : "/api";
//const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "Y";
//baseURL = isHttpProxy ? proxyPattern : API_SERVER.replace(/\/+$/i, "") + baseURL;
baseURL = API_SERVER ? API_SERVER.replace(/\/+$/i, "") + baseURL : baseURL;
console.info("API_SERVER", API_SERVER);

export const realRequest = createRequest({ baseURL: baseURL });
export const mockRequest = createRequest({ baseURL: "/mock" });
export const request = import.meta.env.DEV ? mockRequest : realRequest;
