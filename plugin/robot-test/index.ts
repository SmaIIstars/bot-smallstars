import { cqMsgFormat } from "../../utils/format";
import { messageFilter } from "../../utils/filter";
import { isAtBot, isDev } from "../../utils";
import config from "../../config";
import cqCode from "../../utils/bot/cq-code";

import type { Plugin } from "@/plugin";

const KEYWORD = "botTest";

const plugin: Plugin = ({ ws, http, data }) => {
  if (
    !isDev ||
    !data?.message?.startsWith(KEYWORD) ||
    !messageFilter(data, ["message"])
  )
    return;

  const msgs = cqMsgFormat(data?.message.replace(KEYWORD, "").trim() ?? "");
  if (!isAtBot(msgs)) return;

  ws?.send("send_msg", {
    user_id: config.master,
    message: [
      cqCode.text(
        `${new Date(Date.now())} ${data?.sender?.nickname}(${
          data?.sender?.user_id
        }): ${JSON.stringify(data)}; ${JSON.stringify(msgs)}`
      ),
    ],
  });
};

export default plugin;
