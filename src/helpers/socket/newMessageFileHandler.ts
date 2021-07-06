// const { readFileSync } = require("fs");
// const store = require("../../store");

import { readFileSync } from "fs";

import { store } from "../../store/index";

export const newMessageFileHandler = async (
  ws: any,
  email: any,
  receiver: any,
  filePath: any
) => {
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
};
