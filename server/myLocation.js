const mongoose = require("mongoose");

const mylocationScehma = new mongoose.Schema(
  {
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