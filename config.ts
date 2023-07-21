import { pluginPath } from "./plugin";

const defaultAxiosRequestConfig = {
  timeout: 10 * 1000,
  baseURL: "http://0.0.0.0:5700",
};

export default {
  bot: {
    http: defaultAxiosRequestConfig,
    ws: { hostname: "localhost", port: 6700 },
  },
  plugins: [
    {
      name: "check-in",
      path: pluginPath.CheckIn,
    },
    {
      name: "robot-test",
      path: pluginPath.RobotTest,
    },
  ],

  master: 569910295,
  testGroup: 1065263732,
};
