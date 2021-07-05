const express = require("express");
const multer = require("multer");
const router = express.Router();

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("myFile"), async (req, res) => {
  const file = req.file;
  console.log(file);
  res.json({
    success: true,
    fileName: file.originalname,
    path: file.path,
  });
});

//export this router to use in our server.js
module.exports = router;
