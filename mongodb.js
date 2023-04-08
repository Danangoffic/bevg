const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://danangoffic:kabeldata95@clusterdanang.hldbrfi.mongodb.net/?retryWrites=true&w=majority";

console.log("connecting");

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log("connected!");

// if there's any issue with connection with mongo db
client.connect((err) => {
  if (err != null) {
    throw console.log(err);
  }
  // console.log("connected");
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("closing connection");
  client.close();
});

const db = client.db("v_commerce");
// console.log(db.collection("vouchers"));
const collection = db.collection("vouchers");
const find = collection.find();
find.forEach((doc) => {
  console.log(doc.title);
});
collection
  .insertOne({
    title: "PUBGM-VOUCHER-250",
    price: 250000,
    type: "PUBG",
  })
  .then((res) => {
    if (res) {
      console.log("success insert document with id : " + res.insertedId);
      const last_data = collection.find({ _id: res.insertedId });
      last_data.next().then((res) => {
        console.log("data inserted : ", { res });
      });
      collection.replaceOne({ _id: res.insertedId }, { title: "PUBG-VOUCHER-300", price: 300000, type: "PUBG" }).then((ok) => {
        console.log("replace data : ", { ok });
      });
    }
  })
  .catch((err) => {
    console.log({ err });
  });
// console.log({ find });
