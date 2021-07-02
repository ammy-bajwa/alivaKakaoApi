module.exports = {
  connections: {},
  clients: {},
  authApi: null,
  message: [],
  chatList: {},
  lastTryResults: {},
  addChatList(email, chatList) {
    this.chatList[email] = chatList;
  },
  getChatList(email) {
    return this.chatList[email];
  },
  removeChatList(email) {
    this.chatList[email] = null;
  },
  setConnection(id, ws) {
    this.connections[id] = ws;
  },
  getConnection(id) {
    return this.connections[id];
  },
  removeConnection(id) {
    this.connections[id] = undefined;
  },
  setWs(wsInstance) {
    this.ws = wsInstance;
  },
  getWs() {
    return this.ws;
  },
  setAuthApi(authApiInstance) {
    this.authApi = authApiInstance;
  },
  getAuthApi() {
    return this.authApi;
  },
  setClient(email, clientInstance) {
    this.clients[email] = clientInstance;
  },
  getClient(email) {
    return this.clients[email];
  },
  setLastTry(email, result) {
    this.lastTryResults[email] = result;
  },
  getLastTry(email) {
    return this.lastTryResults[email];
  },
};
