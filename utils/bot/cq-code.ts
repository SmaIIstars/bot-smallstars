// https://docs.go-cqhttp.org/cqcode

export type CQCodeType = "text" | "at" | "image" | "reply";

export type CQCodeData = {
  text: { text: string };
  at: { qq: number; name?: string };
  image: CQCodeImage;
  reply: CQCodeReply;
};

type CQCodeImageType = "flash" | "show";
type CQCodeImage = {
  // 绝对路径 网络 URL Base 编码
  file: string;
  type?: CQCodeImageType;
  subType?: 0 | 1 | 2 | 3 | 4 | 7 | 8 | 9 | 10 | 13;
  url?: string;
  cache?: 0 | 1;
  id?: 40000 | 40001 | 40002 | 40003 | 40004 | 40005;
  c?: 2 | 3;
};

type CQCodeReply = {
  // 回复时所引用的消息id, 必须为本群消息.
  id: number;
  // 自定义回复的信息
  text?: any;
  // 自定义回复时的自定义QQ, 如果使用自定义信息必须指定.
  qq?: number;
  // 自定义回复时的时间, 格式为Unix时间
  time?: number;
  // 起始消息序号, 可通过 get_msg 获得
  seq?: number;
};

export type CQCodeObj<T extends CQCodeType> = {
  type: T;
  data: CQCodeData[T];
};

export const text = (msg: string): CQCodeObj<"text"> => ({
  type: "text",
  data: { text: msg.trim() },
});

export const at = (qq: number, name?: string): CQCodeObj<"at"> => {
  return name
    ? { type: "at", data: { qq, name } }
    : { type: "at", data: { qq } };
};

export const image = (
  file: string,
  type?: CQCodeImageType
): CQCodeObj<"image"> => ({ type: "image", data: { file, type } });

export const reply = (
  id: number,
  props?: Partial<CQCodeReply>
): CQCodeObj<"reply"> => ({ type: "reply", data: { ...props, id } });

export default {
  text,
  at,
  image,
  reply,
};
