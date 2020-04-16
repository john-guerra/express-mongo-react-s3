var express = require("express");
var router = express.Router();

var multer = require("multer");

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage: storage });

const s3Lib = require("../s3Lib/s3Lib.js");
const mongoLib = require("../mongoLib/mongoLib.js");

router.post("/upload", upload.single("file"), (req, res) => {
  // console.log("req.file", req.file);

  s3Lib.upload(req.file.originalname, req.file.buffer).then((url) => {
    console.log("uploaded to s3", url);
    mongoLib.addFile(url).then((mongoRes) => {
      console.log("inserted in mongo, redrecting", mongoRes);
      res.redirect("/");
    });
  });
});

router.get("/files", (req, res) => {
  mongoLib.getFiles().then((files) => res.json({ files }));
});

module.exports = router;
