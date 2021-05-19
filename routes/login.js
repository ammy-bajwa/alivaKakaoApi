var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("Done");
});

//export this router to use in our server.js
module.exports = router;
