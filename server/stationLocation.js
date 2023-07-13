const mongoose = require("mongoose");

const stationlocationScehma = new mongoose.Schema(
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
    collation: "stationLocationInfo",
  }
);

mongoose.model("stationLocationInfo", stationlocationScehma);