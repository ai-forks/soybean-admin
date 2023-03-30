/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnv: any = {
  dev: {
    url: 'http://localhost:8080'
  },
  test: {
    url: 'http://localhost:8080'
  },
  prod: {
    url: 'http://localhost:8080'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv): ServiceEnvConfigWithProxyPattern {
  const { VITE_SERVICE_ENV = 'dev' } = env;
  console.info("env", env, typeof(env));
  const config = serviceEnv[VITE_SERVICE_ENV];

  return {
    ...config,
    proxyPattern: '/proxy-pattern'
  };
}
