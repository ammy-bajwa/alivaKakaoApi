module.exports = {
  connections: {},
  client: null,
  authApi: null,
  message: [],
  setConnection(id, ws) {
    this.connections[id] = ws;
  },
  getConnection(id) {
    return this.connections[id];
  },
  removeConnection(id) {
    this.connections[id] = undefined;
  },
  setConnection(connection) {
    this.connection = connection;
  },
  getConnection() {
    return this.connection;
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
  setClient(clientInstance, id) {
    this.client = clientInstance;
    clientInstance.on("chat", (data, channel) => {
      console.log(("chat data: ", data));
      const sender = data.getSenderInfo(channel);
      if (!sender) return;
      if (data.text === "self") {
        channel.sendChat("Hello from amir");
      } else {
        this.ws;
        const { text, sendAt } = data;
        const messageData = {
          text,
          sender,
          sendAt,
        };
        const ws = this.connections[id];
        ws.send(JSON.stringify(messageData));
      }
    });
  },
  getClient() {
    return this.client;
  },
};
