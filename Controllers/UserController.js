const { ObjectId } = require("mongodb");
const UserModel = require("../Models/User");

class UserController {
  static async getUser(req, res) {
    try {
      console.log("get user");
      var status = 200,
        message = "success";
      const users = await UserModel.find();
      console.log({ data: users });
      if (users.length == 0) {
        (status = 404), (message = "data not found");
      }
      res.status(status).json({ data: users, total: users.length, status, message });
    } catch (error) {
      res.status(500).json({ message: error.message || "internal server errir" });
    }
  }

  static async storeUser(req, res) {
    try {
      console.log("create a new user");
      const { name, email, age } = req.body;
      console.log("name : ", name);
      console.log("email : ", email);
      console.log("age : ", age);

      const insert = await UserModel.create(req.body);
      console.log("inserted data", insert);
      // console.log({ body });
      res.json({ data: insert, status: 200, message: "success" });
    } catch (error) {
      res.status(500).send({ error: error.errors, status: 500, message: "failed" });
    }
  }

  static async getByID(req, res) {
    try {
      console.log("get user by id");

      const user_data = await UserModel.findById(req.params.user_id);
      var status = 200,
        message = "success";
      if (user_data.length == 0) {
        status = 404;
        message = "not found";
      }
      res.json({ data: user_data, status, message }).status(status);
    } catch (error) {}
  }

  static async update(req, res) {
    try {
      console.log("update user by id");
      const id = req.params.user_id;
      const body = req.body;
      //   console.log({ id });
      //   console.log({ body });
      const update = await UserModel.updateOne({ _id: id }, body);
      //   console.log({ update });
      if (update.ok) {
        res.status(200).json({ status: 200, message: "success update", data: update.value });
      } else {
        res.status(400).json({ status: 400, message: "failed", error: update.lastErrorObject });
      }
    } catch (error) {
      console.log("failed update with : ", error);
      res.status(500).json({ status: 500, message: "internal server error" });
    }
  }

  static async delete(req, res) {
    try {
      console.log("delete user");
      const id = req.params.user_id;
      const deleteUser = await UserModel.deleteOne({ _id: id });
      console.log(deleteUser);
      if (deleteUser) {
        res.status(200).json({ status: 200, message: "success" });
      } else {
        res.status(400).json({ status: 400, message: "failed" });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: "internal server error" });
    }
  }
}

module.exports = UserController;
