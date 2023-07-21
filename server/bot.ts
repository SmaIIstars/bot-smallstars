import { http } from "../utils/axios";
import type { ApiResponse, GetLoginInfoRes } from "../types/api";

export const getLoginInfo = async () => {
  const res = await http.post<ApiResponse<GetLoginInfoRes>>({
    url: "/get_login_info",
  });
  return res.data;
};
