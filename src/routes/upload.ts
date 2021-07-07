const express = require("express");
const multer = require("multer");
const router = express.Router();

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("myFile"), async (req: any, res: any) => {
  const file = req.file;
  res.json({
    success: true,
    fileName: file.originalname,
    path: file.path,
  });
});

//export this router to use in our server.js
export default router;
