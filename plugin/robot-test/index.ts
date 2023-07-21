import { cqMsgFormat } from "../../utils/format";
import { messageFilter } from "../../utils/filter";
import { isDev } from "../../utils";
import config from "../../config";
import cqCode, { CQCodeObj } from "../../utils/bot/cq-code";

import type { Plugin } from "@/plugin";

const KEYWORD = "botTest";

const plugin: Plugin = ({ ws, http, data }) => {
  if (
    !isDev ||
    !data?.message?.startsWith(KEYWORD) ||
    !messageFilter(data, ["message"])
  )
    return;

  const msg = cqMsgFormat(data?.message.replace(KEYWORD, "").trim() ?? "");

  // const formatMsgStr = msg.reduce<string[]>((pre, cur, index) => {
  //   const context = JSON.stringify(cur);
  //   pre.push(`${index + 1}: ${context}`);
  //   return pre;
  // }, []);

  ws?.send("send_msg", {
    user_id: config.master,
    message: [
      cqCode.text(
        `${new Date(Date.now())} ${data?.sender?.nickname}(${
          data?.sender?.user_id
        }): ${JSON.stringify(data)}; ${JSON.stringify(msg)}`
      ),
    ],
  });
};

export default plugin;
