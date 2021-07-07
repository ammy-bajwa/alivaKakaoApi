import { newMessageHandler } from "../helpers/socket/newMessageHandler";
import { newMessageFileHandler } from "../helpers/socket/newMessageFileHandler";

import { store } from "../store/index";
import WebSocket from "ws";

export const onMessageHandler = async (ws: any, message: WebSocket.Data) => {
  if (typeof message === "string") {
    const { key, value } = JSON.parse(message);
    if (key === "setEmail") {
      store.setConnection(value, ws);
      ws.email = value;
    } else if (key === "newMessage") {
      const { email, message, receiver } = value;
      await newMessageHandler(ws, email, message, receiver);
    } else if (key === "newMessageFile") {
      const { email, filePath, receiver } = value;
      await newMessageFileHandler(ws, email, receiver, filePath);
    }
  }
};
