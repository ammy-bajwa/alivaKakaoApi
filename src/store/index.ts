import { TalkClient } from "node-kakao";

export const store: any = {
  connections: {},
  clients: {},
  authApi: null,
  message: [],
  chatList: {},
  lastTryResults: {},
  addChatList(email: string, chatList: any) {
    this.chatList[email] = chatList;
  },
  getChatList(email: string) {
    return this.chatList[email];
  },
  removeChatList(email: string) {
    this.chatList[email] = null;
  },
  setConnection(id: any, ws: any) {
    this.connections[id] = ws;
  },
  getConnection(id: any) {
    return this.connections[id];
  },
  removeConnection(id: any) {
    this.connections[id] = undefined;
  },
  setWs(wsInstance: any) {
    this.ws = wsInstance;
  },
  getWs() {
    return this.ws;
  },
  setAuthApi(authApiInstance: any) {
    this.authApi = authApiInstance;
  },
  getAuthApi() {
    return this.authApi;
  },
  setClient(email: string, clientInstance: TalkClient) {
    this.clients[email] = clientInstance;
  },
  getClient(email: string) {
    return this.clients[email];
  },
  setLastTry(email: string, result: any) {
    this.lastTryResults[email] = result;
  },
  getLastTry(email: string) {
    return this.lastTryResults[email];
  },
};
