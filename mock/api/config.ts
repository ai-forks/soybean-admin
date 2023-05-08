import type { MockMethod } from "vite-plugin-mock";

const apis: MockMethod[] = [
  // 获取用户信息(请求头携带token, 根据token获取用户信息)
  {
    url: "/config",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<Config.Config> => {
      return {
        code: 200,
        message: "",
        data: {
          apiServer: "",
        },
      };
    },
  },
];

export default apis;
