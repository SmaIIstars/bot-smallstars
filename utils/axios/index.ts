import BaseRequest from "./utils/request";
import { INSTANCE_INTERCEPTORS } from "./utils/interceptor";
import config from "../../config";

// api axios instance
const http = new BaseRequest({
  ...config.bot.http,
  interceptors: INSTANCE_INTERCEPTORS,
});

const apiRequest = new BaseRequest({
  ...config.bot.http,
  interceptors: INSTANCE_INTERCEPTORS,
});

export { http };
export default apiRequest;
