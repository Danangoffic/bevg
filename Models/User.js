const M = require("../mongoose");

const userSchema = new M.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  age: {
    type: Number,
    required: [true, "Age is required!"],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

const User = M.model("User", userSchema);

module.exports = User;
