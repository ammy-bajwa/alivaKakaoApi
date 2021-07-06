import { store } from "../store";

export const onCloseHandler = (ws: any) => {
  try {
    const client = store.getClient(ws.email);
    client.close();
    console.log(`Client closed for ${ws.email}`);
    store.setLastTry(ws.email, null);
  } catch (error) {
    console.log("Already closed: ", error.message);
  }
};
