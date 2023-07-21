import WebSocket from "ws";
import ApiEvent from "./api";

export type BotFunctions = {
  connect?: () => void;
  listen?: (data: string) => void;
};

class BotWebSocket {
  wss: WebSocket.Server;
  clientWebSocket: WebSocket | undefined;

  constructor(config: WebSocket.ServerOptions, functions?: BotFunctions) {
    const { connect, listen } = functions ?? {};
    this.wss = new WebSocket.Server(config);

    this.wss.on("connection", (ws) => {
      // Store the client WebSocket instance
      this.clientWebSocket = ws;

      if (connect) connect();

      if (listen) ws.on("message", listen);

      // Event handler for when the client disconnects
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  }

  send = <T extends keyof ApiEvent>(action: T, params: ApiEvent[T]) => {
    const data = JSON.stringify({ action, params });
    this.clientWebSocket?.send(data);
  };
}

export default BotWebSocket;
