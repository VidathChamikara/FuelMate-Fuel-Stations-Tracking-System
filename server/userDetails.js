const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    mobile: String,
    userType: String,
  },
  {
    collation: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);