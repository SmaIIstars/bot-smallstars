# bot-smallstars

## config.ts

Add config.ts file in root director (same level as index.ts)

```ts
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
    {
      name: "schedule",
      path: pluginPath.Schedule,
    },
  ],

  master: 123456,
  testGroup: 123456789,
};
```
