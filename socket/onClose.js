const store = require("../store");

const onCloseHandler = (ws) => {
  try {
    const client = store.getClient(ws.email);
    client.close();
    console.log(`Client closed for ${ws.email}`);
    store.setLastTry(ws.email, null);
  } catch (error) {
    console.log("Already closed: ", error.message);
  }
};

module.exports = { onCloseHandler };
