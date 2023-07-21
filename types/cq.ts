// https://docs.go-cqhttp.org/reference/data_struct.html#post-type
export type PostType =
  | "meta_event"
  | "message"
  | "message_sent"
  | "request"
  | "notice";

type BasePostType = {
  post_type: PostType;
  time: number;
  self_id: number;
};

export type Sender = {
  age: number;
  area: string;
  card: string;
  level: string;
  nickname: string;
  role: string;
  sex: string;
  title: string;
  user_id: number;
};

export type CQMessage = BasePostType & {
  post_type: "message";
  message_type: "private" | "group";
  sub_type: "friend" | "normal";
  user_id: number;
  message_id: number;
  message: string;
  raw_message: string;
  sender: Sender;

  message_seq: number;
  anonymous: null;
  font: number;
  group_id: number;

  // private
  target_id?: number;
};

export type CQEvent = BasePostType & {
  post_type: "meta_event";
  meta_event_type: "heartbeat" | "lifecycle";
  status: {
    app_enabled: boolean;
    app_good: boolean;
    app_initialized: boolean;
    good: boolean;
    online: boolean;
    plugins_good: null;
    stat: {
      packet_received: number;
      packet_sent: number;
      packet_lost: number;
      message_received: number;
      message_sent: number;
      disconnect_times: number;
      lost_times: number;
      last_message_time: number;
    };
  };
  interval: number;
};
