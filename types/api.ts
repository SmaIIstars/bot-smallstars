export type ApiResponse<T = Record<string, any>> = {
  // "状态, 表示 API 是否调用成功, 如果成功, 则是 OK, 其他的在下面会说明"
  status: "ok" | "async" | "failed";
  retcode: 0 | 1;
  // "错误消息, 仅在 API 调用失败时有该字段"
  msg: string;
  // "对错误的详细解释(中文), 仅在 API 调用失败时有该字段"
  wording: string;
  data: T;
  // '回声', 如果请求时指定了 echo, 那么响应也会包含 echo
  echo: any;
};

export type GetLoginInfoRes = {
  // QQ 号
  user_id: number;
  // QQ 昵称
  nickname: string;
};
