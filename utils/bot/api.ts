import { CQCodeObj } from "./cq-code";

type ApiEvent = {
  send_msg: {
    // 消息类型, 支持 private、group , 分别对应私聊、群组, 如不传入, 则根据传入的 *_id 参数判断
    message_type?: "private" | "group";
    // 对方 QQ 号 ( 消息类型为 private 时需要 )
    user_id?: number;
    // 群号 ( 消息类型为 group 时需要 )
    group_id?: number;
    // 要发送的内容
    message: string | CQCodeObj<any> | CQCodeObj<any>[];
    // false	消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效
    auto_escape?: boolean;
  };
};

export default ApiEvent;
