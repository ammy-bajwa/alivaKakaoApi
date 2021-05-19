module.exports = {
  ws: null,
  client: null,
  authApi: null,
  message: [],
  setAuthApi(authApiInstance) {
    this.authApi = authApiInstance;
  },
  getAuthApi() {
    return this.authApi;
  },
  setClient(clientInstance) {
    this.client = clientInstance;
    clientInstance.on("chat", (data, channel) => {
      console.log(("chat data: ", data));
      const sender = data.getSenderInfo(channel);
      if (!sender) return;

      if (data.text === "self") {
        channel.sendChat("Hello from amir");
      } else {
        this.ws;
      }
    });
  },
  getClient() {
    return this.client;
  },
};
