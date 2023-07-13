const mongoose = require("mongoose");

const mylocationScehma = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo",
      required: true,
    },
    latitude: Number,
    longitude: Number,
    currentDateTime: String,
    locationName: String,
  },
  {
    collation: "myLocationInfo",
  }
);

mongoose.model("myLocationInfo", mylocationScehma);