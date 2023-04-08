const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://danangoffic:kabeldata95@clusterdanang.hldbrfi.mongodb.net/?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
(async () => {
  try {
    await db.connect();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;
