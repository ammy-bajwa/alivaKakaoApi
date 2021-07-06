export const store: any = {
  connections: {},
  clients: {},
  authApi: null,
  message: [],
  chatList: {},
  lastTryResults: {},
  addChatList(email: any, chatList: any) {
    this.chatList[email] = chatList;
  },
  getChatList(email: any) {
    return this.chatList[email];
  },
  removeChatList(email: any) {
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
  setClient(email: any, clientInstance: any) {
    this.clients[email] = clientInstance;
  },
  getClient(email: any) {
    return this.clients[email];
  },
  setLastTry(email: any, result: any) {
    this.lastTryResults[email] = result;
  },
  getLastTry(email: any) {
    return this.lastTryResults[email];
  },
};
