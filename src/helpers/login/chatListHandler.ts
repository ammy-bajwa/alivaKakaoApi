import { getAllMessages } from "../chat";

export const chatListHandler = async (
  talkClient: any,
  allList: any,
  email: any,
  biggestChatLog = 0
) => {
  const myTaskPromise = new Promise(async (resolve, reject) => {
    try {
      const chatList: any = {};
      let innerBiggestChatLog = biggestChatLog;
      for (const item of allList) {
        const { displayUserList, lastChatLogId, newChatCount } = item.info;
        const { nickname, userId } = displayUserList[0];
        const currentUserId = parseInt(userId);
        let itemChat = [];
        const lastChatLogIdInt = parseInt(lastChatLogId);
        if (lastChatLogIdInt > biggestChatLog) {
          const { newMessages }: any = await getAllMessages(
            item,
            lastChatLogId,
            biggestChatLog,
            talkClient.clientUser.userId,
            email,
            nickname
          );
          itemChat = newMessages;
          if (lastChatLogIdInt > innerBiggestChatLog) {
            innerBiggestChatLog = lastChatLogIdInt;
          }
        }
        chatList[nickname] = {
          ...item.info,
          messages: itemChat,
          intId: currentUserId,
          newChatCount,
          lastChatLogId: lastChatLogIdInt,
        };
      }
      resolve({ chatList, biggestChatLog: innerBiggestChatLog });
    } catch (error) {
      reject(error);
    }
  });

  return await myTaskPromise;
};
