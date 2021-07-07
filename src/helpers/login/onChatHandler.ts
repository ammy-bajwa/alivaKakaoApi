import { TalkChannel, TalkChatData } from "node-kakao";
import { store } from "../../store";

export const onChatHandler = (
  data: TalkChatData,
  channel: TalkChannel,
  email: string
) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) {
    return;
  } else {
    const {
      chat: {
        text,
        sendAt,
        attachment,
        logId,
        sender: { userId },
      },
    } = data;
    const senderIntUserId = parseInt(userId.toString());
    const info = channel.getAllUserInfo();
    let receiverUser: any = {};
    let senderUser: any = {};
    try {
      for (const item of info) {
        const { userId } = item;
        const currentUserIntId = parseInt(userId.toString());
        if (senderIntUserId === currentUserIntId) {
          senderUser = item;
          senderUser.intId = currentUserIntId;
        } else {
          receiverUser = item;
          receiverUser.intId = parseInt(userId.toString());
        }
      }
    } catch (error) {
      console.error(error);
    }
    const messageData = {
      key: "newMesssage",
      text,
      sender,
      logId: parseInt(logId.toString()),
      attachment,
      receiverUser,
      sendAt,
    };
    const ws = store.getConnection(email);
    ws.send(JSON.stringify(messageData));
  }
};
