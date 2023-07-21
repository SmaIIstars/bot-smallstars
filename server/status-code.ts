const statusCode = {
  401: {
    statusCode: 401,
    message: "access token 未提供",
  },
  403: {
    statusCode: 403,
    message: "access token 不符合",
  },
  406: {
    statusCode: 406,
    message:
      "Content-Type 不支持 (非 application/json 或 application/x-www-form-urlencoded",
  },
  404: {
    statusCode: 404,
    message: "API 不存在",
  },
  200: {
    statusCode: 200,
    message:
      "除上述情况外所有情况 (具体 API 调用是否成功, 需要看 API 的 响应数据",
  },
};

export default statusCode;
