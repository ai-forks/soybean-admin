import { getServiceEnvConfig } from "~/.env-config";
import { createRequest } from "./request";

const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "Y";

//export const request = [true, "true"].includes(import.meta.env.VITE_USE_MOCK) ?
export const request = createRequest({
	baseURL: import.meta.env.VITE_GLOB_API_URL,
});

/* export const request = createRequest({
	baseURL: isHttpProxy ? proxyPattern : url,
});

export const mockRequest = createRequest({ baseURL: import.meta.env.VITE_GLOB_API_URL });
 */
