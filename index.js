const express = require("express");
const app = express();
const router = require("./routers");
// const mongodb = require("./mongodb");
const port = 3000;

const myLogger = function (req, res, next) {
  console.log("target url :", req.path, "method : ", req.method);
  req.requestTime = Date.now();
  // console.log(req.requestTime);
  next();
};

app.use(myLogger).use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
