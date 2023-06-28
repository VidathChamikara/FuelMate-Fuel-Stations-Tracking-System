const mongoose = require('mongoose');

const fuelStationSchema = new mongoose.Schema({
  fuelStationName: String,
  ownerName:  String,
  email: { type: String, unique: true },
  password:  String,
  location:  String,
},
{

    collection: "FuelStationInfo",
}


);

 mongoose.model('FuelStationInfo', fuelStationSchema);
