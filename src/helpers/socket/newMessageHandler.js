const store = require("../../store");

const newMessageHandler = async (ws, email, message, receiver) => {
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

module.exports = { newMessageHandler };
