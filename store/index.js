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
  },
  getClient() {
    return this.client;
  },
};
