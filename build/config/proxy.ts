import type { ProxyOptions } from "vite";

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param envConfig - env环境配置
 */
export function createViteProxy(proxys: string[][]) {
  if(typeof(proxys) == 'string'){
    proxys = JSON.parse(proxys);
  }
	// if (!isOpenProxy) return undefined;
	const proxy: Record<string, string | ProxyOptions> = {};
	/**
   *     [envConfig.proxyPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${envConfig.proxyPattern}`), '')
    }
   */
	proxys.forEach((xs) => {
		let name = xs[0];
		proxy[name] = {
			target: xs[1],
			changeOrigin: true,
			rewrite: (path) => path.replace(new RegExp(`^${name}`), ""),
		};
	});
  console.info("proxy", proxy);
	return proxy;
}
