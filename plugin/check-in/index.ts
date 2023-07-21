import schedule from "node-schedule";
import { isDev } from "../../utils";
import { cqMsgFormat } from "../../utils/format";
import { messageFilter } from "../../utils/filter";
import { Plugin } from "../../plugin";
import useStore from "../../store";
import cqCode from "../../utils/bot/cq-code";
import config from "../../config";

const WHITE_WORDS = ["签到", "簽到", "check-in"];
const DAILY_IMAGE_API = `https://t.mwm.moe/pc`;

// "https://imgapi.cn/api.php?fl=dongman&gs=images"
// https://imgapi.cn/wiki.html
// "https://www.dmoe.cc/random.php";

const checkInList: number[] = [];
const listClearJob = schedule.scheduleJob("0 0 5 * * *", () => {
  checkInList.length = 0;
});

const plugin: Plugin = async ({ ws, http, data }) => {
  if (
    !data ||
    !messageFilter(data, ["message"]) ||
    data.message_type !== "group"
  )
    return;

  const msg = cqMsgFormat(data?.message ?? "");
  const [getStore] = useStore();

  const flags = msg.reduce<[boolean, boolean]>(
    (pre, cur) => {
      if (
        cur.type === "at" &&
        Number(Reflect.get(cur.data, "qq")) === getStore().botInfo.qq
      ) {
        pre[0] = true;
        return pre;
      }

      if (cur.type === "text") {
        const text = Reflect.get(cur.data, "text") ?? "";
        if (!text) return pre;

        for (const word of WHITE_WORDS) {
          if (text.includes(word)) {
            pre[1] = true;
            return pre;
          }
        }
      }

      return pre;
    },
    [false, false]
  );

  if (!flags.some((v) => !v)) {
    if (
      checkInList.includes(data.sender.user_id) &&
      !(isDev && data.sender.user_id === config.master)
    ) {
      ws.send("send_msg", {
        group_id: data.group_id,
        message: [
          cqCode.reply(data.message_id),
          cqCode.text("今日已签到, 请明日再来!"),
        ],
      });
    } else {
      ws.send("send_msg", {
        group_id: data.group_id,
        message: [
          cqCode.reply(data.message_id),
          cqCode.text("今日签到成功, 壁纸请查收! (>_<)"),
          cqCode.image(`${DAILY_IMAGE_API}?${Date.now()}`),
        ],
      });

      checkInList.push(data.sender.user_id);
    }
  }
};

export default plugin;
