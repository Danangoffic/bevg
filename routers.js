const express = require("express");
const router = express.Router();
const UserController = require("./Controllers/UserController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// grouping routes
// user routes
const userRoute = router.route("/api/users");
userRoute.get(UserController.getUser);
userRoute.post(UserController.storeUser);
userRoute.get(UserController.getByID);
router.put("/api/users/:user_id", [UserController.update]);
router.delete("/api/users/:user_id", [UserController.delete]);

module.exports = router;
