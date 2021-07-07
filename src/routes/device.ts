import express from "express";
import { AuthApiClient } from "node-kakao";

import { store } from "../store";

const router = express.Router();

router.post("/sendCode", async (req: any, res: any) => {
  const { deviceName, deviceId, email, password } = req.body;
  const authApi = await AuthApiClient.create(deviceName, deviceId);
  const form = { email, password, forced: true };
  store.setAuthApi(authApi);
  authApi
    .requestPasscode(form)
    .then((data: any) => {
      if (data.success) {
        res.json({
          message: "Code sended to your kiwi device successfully",
        });
      } else {
        res.json({
          message: "Error in sending code to your device",
          error: data,
        });
      }
    })
    .catch((err: any) => {
      res.json({
        message: "Error in sending code to your device",
        error: err,
      });
    });
});

router.post("/setCode", async (req: any, res: any) => {
  const authApi = store.authApi;
  const { code, email, password } = req.body;
  const form = { email, password, forced: true };
  console.log(authApi.name);
  console.log(authApi.deviceUUID);
  authApi
    .registerDevice(form, code, true)
    .then((data: any) => {
      if (!data.success) {
        res.json({
          message: "Error in registering your device",
          error: data.status,
        });
      } else {
        res.json({
          message: "Device registere on kiwi successfully",
        });
      }
    })
    .catch((err: any) => {
      res.json({
        message: "Error in registering your device",
        error: err,
      });
    });
});

//export this router to use in our server.js
export default router;
