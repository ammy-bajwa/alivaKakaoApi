const {
  newMessageFileHandler,
} = require("../helpers/socket/newMessageFileHandler");
const { newMessageHandler } = require("../helpers/socket/newMessageHandler");

const store = require("../store");

const onMessageHandler = async function incoming(ws, message) {
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
};

module.exports = {
  onMessageHandler,
};
