const { readFileSync } = require("fs");

const store = require("../store");

const handleNewMessage = async (ws, email, message, receiver) => {
  const client = store.getClient(email);
  const allList = client.channelList.all();
  for (const item of allList) {
    const { displayUserList } = item.info;
    const { nickname, userId } = displayUserList[0];
    if (receiver === nickname) {
      const receiverUser = { intId: parseInt(userId), nickname };
      const {
        result: { text, sendAt, sender, logId },
      } = await item.sendChat(message);
      const newMessage = {
        key: "newMesssage",
        text,
        sender: { intId: parseInt(sender.userId), nickname: email },
        attachment: {},
        logId: parseInt(logId),
        receiverUser,
        sendAt: new Date().getTime(),
      };
      ws.send(JSON.stringify(newMessage));
      console.log("Message sended successfully: ", sendAt);
      break;
    }
  }
};

const onMessageHandler = async function incoming(ws, message) {
  const { key, value } = JSON.parse(message);
  if (key === "setEmail") {
    store.setConnection(value, ws);
    ws.email = value;
  } else if (key === "newMessage") {
    const { email, message, receiver } = value;
    handleNewMessage(ws, email, message, receiver);
  } else if (key === "newMessageFile") {
    const { email, message, receiver, filePath } = value;
    console.log(filePath);
    const client = store.getClient(email);
    const allList = client.channelList.all();
    for (const item of allList) {
      const { displayUserList } = item.info;
      const { nickname, userId } = displayUserList[0];
      if (receiver === nickname) {
        const file = readFileSync(filePath);
        console.log(file);
        const {
          result: { text, sendAt, sender, attachment, logId },
        } = await item.sendMedia(2, {
          data: file,
        });
        const receiverUser = { intId: parseInt(userId), nickname };
        const newMessage = {
          key: "newMesssage",
          text,
          sender: { intId: parseInt(sender.userId), nickname: email },
          attachment,
          logId: parseInt(logId),
          receiverUser,
          sendAt,
        };
        ws.send(JSON.stringify(newMessage));
        console.log("File sended successfully");
        break;
      }
    }
  } else if (key === "isMessageUpdateNeeded") {
    const { time, email, focusedUserId } = value;
    console.log(value);
    const client = store.getClient(email);
    const allList = client.channelList.all();
    let messageStore = [];
    for (const item of allList) {
      const allChat = (await item.getChatListFrom()).result;
      const { displayUserList } = item.info;
      const { nickname, userId } = displayUserList[0];
      const currentUserId = parseInt(userId);
      messageStore = [];
      if (currentUserId === focusedUserId) {
        for (const message of allChat) {
          const isMeSender =
            parseInt(message.sender.userId) ===
            parseInt(client.clientUser.userId);
          const senderName = isMeSender ? email : nickname;
          const msgObj = {
            text: message.text,
            receiverUserName: isMeSender ? nickname : email,
            attachment: message.attachment,
            received: true,
            senderName,
            sendAt: message.sendAt,
          };
          if (message.sendAt > time) {
            messageStore.push(msgObj);
          }
        }
        console.log("New Messages: ", messageStore);
        ws.send(
          JSON.stringify({
            key: "unreadMessages",
            value: {
              userId: focusedUserId,
              messageStore,
            },
          })
        );
        break;
      }
    }
  }
};

module.exports = {
  onMessageHandler,
};
