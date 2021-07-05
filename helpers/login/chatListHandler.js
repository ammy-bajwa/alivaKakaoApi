const { getAllMessages } = require("../chat");

const chatListHandler = async (talkClient, allList, email, biggestChatLog) => {
  const myTaskPromise = new Promise(async (resolve, reject) => {
    try {
      const chatList = {};
      let innerBiggestChatLog = biggestChatLog;
      for (const item of allList) {
        const { displayUserList, lastChatLogId, newChatCount } = item.info;
        const { nickname, userId } = displayUserList[0];
        const currentUserId = parseInt(userId);
        let itemChat = [];
        const lastChatLogIdInt = parseInt(lastChatLogId);
        if (lastChatLogIdInt > innerBiggestChatLog) {
          const { newMessages } = await getAllMessages(
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

module.exports = {
  chatListHandler,
};
