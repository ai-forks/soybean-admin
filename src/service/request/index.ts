import { getServiceEnvConfig } from "~/.env-config";
import { createRequest } from "./request";

const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);
let baseURL = import.meta.env.DEV ? "/mock" : "/api";
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "Y";
baseURL = isHttpProxy ? proxyPattern : baseURL;
console.info("===>url", url, isHttpProxy, proxyPattern, import.meta.env.PROD, baseURL);

export const realRequest = createRequest({ baseURL: baseURL });

export const mockRequest = createRequest({ baseURL: "/mock" });

export const request = import.meta.env.DEV ? mockRequest : realRequest;
