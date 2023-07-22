import { isAtAndHitKeyword, isDev } from "../../utils";
import { cqMsgFormat } from "../../utils/format";
import { messageFilter } from "../../utils/filter";
import { Plugin } from "../../plugin";
import cqCode from "../../utils/bot/cq-code";
import config from "../../config";
import { schedule } from "../../utils/schedule";

const KEYWORDS = ["签到", "簽到", "check-in"];
const DAILY_IMAGE_API = `https://t.mwm.moe/pc`;

// "https://imgapi.cn/api.php?fl=dongman&gs=images"
// https://imgapi.cn/wiki.html
// "https://www.dmoe.cc/random.php";

const checkInList: number[] = [];
schedule.add("check-in-list-clear", "0 0 5 * * *", () => {
  checkInList.length = 0;
});

const plugin: Plugin = async ({ ws, http, data }) => {
  if (
    !data ||
    !messageFilter(data, ["message"]) ||
    data.message_type !== "group"
  )
    return;

  const flags = isAtAndHitKeyword(cqMsgFormat(data?.message ?? ""), KEYWORDS);

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
