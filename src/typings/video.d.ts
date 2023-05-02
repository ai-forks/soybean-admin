/** 用户相关模块 */
declare namespace Video {
  interface Banner {
    image: string;
    url: string;
  }
  interface VideoListInfo {
    id: string;
    /** 标题 */
    title: string;
    logo: string;
    quality: number;
  }
  interface VideoInfo {
    id: string;
    /** 标题 */
    title: string;
    logo: string;
    quality: number;
    /** 视频摘要 */
    summary: string;
    year: number;
    /** 地区 */
    area: string;
    /** 分类 */
    class: string;
    /** 导演 */
    director: string;
    actor: string;
    updateAt: number;
    /** 线路 */
    lines: Line[];
  }
  interface Line {
    title: string;
    list: Info[];
  }
  interface Info {
    title: string;
    url: string;
    urls: {
      quality: string;
      url: string;
    }[];
  }
}
