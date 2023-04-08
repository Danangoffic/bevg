const { ObjectId } = require("mongodb");
const dbMongo = require("../connection");

const collection = dbMongo.db("v_commerce").collection("users");

class UserModel {
  static async All() {
    try {
      return await collection.find({}).toArray();
    } catch (error) {
      console.log("failed to get users with : ", error);
      return null;
    }
  }

  static async Create(data) {
    return await collection.insertOne(data);
  }

  static async ByID(id = "") {
    if (id === "") {
      return null;
    }
    try {
      const newID = new ObjectId(id);
      const result = await collection.find({ _id: newID }).toArray();
      return result;
    } catch (error) {
      console.log("failed to get data with : ", error);
      return null;
    }
  }

  /**
   * To update user data by id
   * @param {string} id String
   * @param {Object} data Object
   * @returns {Promise} Promise
   */
  static async update(id = "", data = {}) {
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  static async delete(id = "") {
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }
}
module.exports = UserModel;
