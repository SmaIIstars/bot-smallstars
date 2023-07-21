import BotWebSocket from "@/utils/bot/ws";
import type BaseRequest from "@/utils/axios/utils/request";
import type { CQMessage } from "@/types/cq";

type PluginProps = {
  ws: BotWebSocket;
  http: BaseRequest;
  data: CQMessage;
};

export type Plugin = (props: PluginProps) => any;

export enum pluginPath {
  CheckIn = "./plugin/check-in",
  RobotTest = "./plugin/robot-test",
}
