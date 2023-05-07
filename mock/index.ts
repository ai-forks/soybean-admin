import api from "./api";

export async function setupMockServer() {
  if (import.meta.env.SSR) return;
  const { createProdMockServer } = await import("vite-plugin-mock/es/createProdMockServer");
  createProdMockServer(api);
}
