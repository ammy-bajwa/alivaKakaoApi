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
  //    else if (key === "isMessageUpdateNeeded") {
  //     const { time, email, focusedUserId } = value;
  //     console.log(value);
  //     const client = store.getClient(email);
  //     const allList = client.channelList.all();
  //     let messageStore = [];
  //     for (const item of allList) {
  //       const allChat = (await item.getChatListFrom()).result;
  //       const { displayUserList } = item.info;
  //       const { nickname, userId } = displayUserList[0];
  //       const currentUserId = parseInt(userId);
  //       messageStore = [];
  //       if (currentUserId === focusedUserId) {
  //         for (const message of allChat) {
  //           const isMeSender =
  //             parseInt(message.sender.userId) ===
  //             parseInt(client.clientUser.userId);
  //           const senderName = isMeSender ? email : nickname;
  //           const msgObj = {
  //             text: message.text,
  //             receiverUserName: isMeSender ? nickname : email,
  //             attachment: message.attachment,
  //             received: true,
  //             senderName,
  //             sendAt: message.sendAt,
  //           };
  //           if (message.sendAt > time) {
  //             messageStore.push(msgObj);
  //           }
  //         }
  //         console.log("New Messages: ", messageStore);
  //         ws.send(
  //           JSON.stringify({
  //             key: "unreadMessages",
  //             value: {
  //               userId: focusedUserId,
  //               messageStore,
  //             },
  //           })
  //         );
  //         break;
  //       }
  //     }
  //   }
};

module.exports = {
  onMessageHandler,
};
