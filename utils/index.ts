import useStore from "../store";
import { CQCodeObj } from "./bot/cq-code";
import config from "../config";

export const isDev = process.env.NODE_ENV === "development";

export const isMaster = (qq: number) => {
  return config.master === qq;
};

export const isAtBot = (msgs: CQCodeObj[]) => {
  const [getStore] = useStore();

  return msgs.some(
    (msg) =>
      msg.type === "at" &&
      Number(Reflect.get(msg.data, "qq")) === getStore().botInfo.qq
  );
};

export const isAtAndHitKeyword = (msgs: CQCodeObj[], keywords: string[]) => {
  const [getStore] = useStore();

  const flags = msgs.reduce<[boolean, boolean]>(
    (pre, cur) => {
      if (
        cur.type === "at" &&
        Number(Reflect.get(cur.data, "qq")) === getStore().botInfo.qq
      ) {
        pre[0] = true;
        return pre;
      }

      if (cur.type !== "text") return pre;

      const text: string = Reflect.get(cur.data, "text");
      if (!text) return pre;

      for (const word of keywords) {
        if (text.includes(word)) {
          pre[1] = true;
          return pre;
        }
      }

      return pre;
    },
    [false, false]
  );

  return flags;
};
