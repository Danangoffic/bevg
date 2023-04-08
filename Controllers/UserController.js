const { ObjectId } = require("mongodb");
const UserModel = require("../Models/UserModel");

class UserController {
  static async getUser(req, res) {
    try {
      console.log("get user");
      var status = 200,
        message = "success";
      const users = await UserModel.All();
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
      if (name === "") {
        res.status(400).json({ message: "name is required" });
      }
      if (email === "") {
        res.status(400).json({ message: "email is required" });
      }
      if (age === null || age === 0) {
        res.status(400).json({ message: "age is required" });
      }
      const insert = await UserModel.Create(req.body);
      console.log("inserted id", insert.insertedId);
      // console.log({ body });
      res.json({ data: insert.insertedId });
    } catch (error) {}
  }

  static async getByID(req, res) {
    try {
      console.log("get user by id");

      const user_data = await UserModel.ByID(req.params.user_id);
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
      const update = await UserModel.update(id, body);
      if (update.ok) {
        res.status(200).json({ status: 200, message: "success", data: update.value });
      } else {
        res.status(400).json({ status: 400, message: "failed" });
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
      const deleteUser = await UserModel.delete(id);
      if (deleteUser.deletedCount) {
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
