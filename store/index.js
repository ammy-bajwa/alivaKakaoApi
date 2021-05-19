module.exports = {
  ws: null,
  client: null,
  message: [],
  setClient(clientInstance) {
    this.client = clientInstance;
  },
  getClient() {
    return this.client;
  },
};
