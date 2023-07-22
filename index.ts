import _ from "lodash";
import BotWebSocket from "./utils/bot/ws";
import { http } from "./utils/axios";
import safeJSONParse from "./utils/safe-json-parse";
import config from "./config";
import { Plugin } from "./plugin";
import { getLoginInfo } from "./server/bot";
import { isDev } from "./utils";
import cqCode from "./utils/bot/cq-code";
import useStore from "./store";

const listen = (data: string) => {
  if (!data) return;

  const JsonData = safeJSONParse(data, (err) => {
    console.log("JSON.parse failed", err);
  });

  config.plugins.forEach((p) => {
    import(p.path).then((plugin) => {
      const main: Plugin = plugin.default;
      main({ ws: botWS, http, data: JsonData });
    });
  });
};

const connect = async () => {
  console.log("Client Connect");

  const botInfo = await getLoginInfo();
  const [, changeStore] = useStore();

  changeStore({ botInfo: { qq: botInfo.user_id, nickname: botInfo.nickname } });

  if (isDev) return;
  botWS.send("send_msg", {
    user_id: config.master,
    // group_id: config.testGroup,
    message: [
      cqCode.text(
        `${botInfo.nickname}(${botInfo.user_id}) is logged in on ${new Date(
          Date.now()
        )}`
      ),
    ],
  });
};

const botWS = new BotWebSocket(config.bot.ws, { connect, listen });
