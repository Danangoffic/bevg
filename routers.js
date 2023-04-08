const express = require("express");
const router = express();
const UserController = require("./Controllers/UserController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("Hello World!");
});

//grouping routes
const userRoute = router.route("/api/users");
userRoute.get(UserController.getUser);
userRoute.post(UserController.storeUser);
userRoute.get(UserController.getByID);
userRoute.put(UserController.update);
userRoute.delete(UserController.delete);

module.exports = router;
