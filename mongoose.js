const M = require("mongoose");
const uri = "mongodb+srv://danangoffic:kabeldata95@clusterdanang.hldbrfi.mongodb.net/v_commerce?retryWrites=true&w=majority&connectTimeoutMS=30000";
(async () => {
  try {
    await M.connect(uri);
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
