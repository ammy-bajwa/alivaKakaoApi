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
  },
  getClient() {
    return this.client;
  },
};
