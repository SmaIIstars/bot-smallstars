import { cqMsgFormat } from "../../utils/format";
import { messageFilter } from "../../utils/filter";
import cqCode, { CQCodeObj } from "../../utils/bot/cq-code";
import { schedule } from "../../utils/schedule";
import { isMaster } from "../../utils";
import useStore from "../../store";

import type { Plugin } from "@/plugin";

type ScheduleFeatType = "add" | "delete" | "get";

const KEYWORD = "schedule";

const scheduleFeatType = ["add", "delete", "get"];

const plugin: Plugin = ({ ws, http, data }) => {
  if (!messageFilter(data, ["message"]) && !isMaster(data?.sender?.user_id))
    return;

  const [getStore] = useStore();
  const msgs = cqMsgFormat(data?.message ?? "");

  const res = msgs.reduce<[boolean, CQCodeObj | null]>(
    (pre, cur) => {
      if (
        cur.type === "at" &&
        Number(Reflect.get(cur.data, "qq")) === getStore().botInfo.qq
      ) {
        pre[0] = true;
      }

      if (cur.type !== "text") return pre;
      const text: string = Reflect.get(cur.data, "text");

      if (!text) return pre;
      if (text.startsWith(KEYWORD)) pre[1] = cur;

      return pre;
    },
    [false, null]
  );

  if (!res.some((v) => !v)) {
    const commendStr: string = Reflect.get(res[1]!.data, "text");
    const [, type, jobName, ...props] = commendStr.split(" ") as [
      typeof KEYWORD,
      ScheduleFeatType,
      string,
      ...any[]
    ];

    if (type === "get") {
      const res = schedule
        .get()
        .map((job) => `${job.name}: ${job.nextInvocation}`);

      ws.send("send_msg", {
        group_id: data.group_id,
        message: [cqCode.reply(data.message_id), cqCode.text(res.join("\n"))],
      });
    } else if (type === "delete") {
      //
    } else if (type === "add") {
      //
    }
  }
};

export default plugin;
