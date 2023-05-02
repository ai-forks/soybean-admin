import type { MockMethod } from "vite-plugin-mock";
import { videoModel, banners } from "../model/video";

/** 参数错误的状态码 */
const ERROR_PARAM_CODE = 10000;

const ERROR_PARAM_MSG = "参数校验失败！";

const apis: MockMethod[] = [
  // 用户+密码 登录
  {
    url: "/mock/v/search",
    method: "post",
    response: (options: Service.MockOption): Service.MockServiceResult<{ list: Video.VideoListInfo[] }> => {
      const { userName = undefined, password = undefined } = options.query;

      return {
        code: 200,
        data: {
          list: videoModel,
        },
      };
    },
  },
  // 获取用户信息(请求头携带token, 根据token获取用户信息)
  {
    url: "/mock/v/home",
    method: "get",
    response: (
      options: Service.MockOption,
    ): Service.MockServiceResult<{
      movie: Video.VideoListInfo[];
      tv: Video.VideoListInfo[];
      anime: Video.VideoListInfo[];
      hot: Video.VideoListInfo[];
      banner: Video.Banner[];
    }> => {
      // 这里的mock插件得到的字段是authorization, 前端传递的是Authorization字段
      return {
        code: 200,
        message: "",
        data: {
          movie: videoModel,
          tv: videoModel,
          anime: videoModel,
          hot: videoModel,
          banner: banners,
        },
      };
    },
  },
];

export default apis;
