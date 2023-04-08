const M = require("mongoose");
const MONGO_USER = "danangoffic";
const MONGO_PASS = "kabeldata95";
const MONGO_DB = "v_commerce";
const uri = "mongodb+srv://" + MONGO_USER + ":" + MONGO_PASS + "@clusterdanang.hldbrfi.mongodb.net/" + MONGO_DB + "?retryWrites=true&w=majority";
(async () => {
  try {
    console.log("try to connecto mongo db to : ", uri);
    await M.connect(uri, { maxPoolSize: 1000, serverSelectionTimeoutMS: 5000, keepAlive: true });
  } catch (error) {
    console.log("failed to connect with mongodb!");
  }
})();

const db = M.connection;
db.on("error", console.error.bind(console, "connection to mongo has error occured!"));
db.once("open", () => {
  // connected
  console.log("mongo db connected!");
});

module.exports = M;
