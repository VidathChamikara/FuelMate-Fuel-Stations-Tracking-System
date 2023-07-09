const mongoose = require('mongoose');

const fuelStationSchema = new mongoose.Schema({
  fuelStationName: String,
  ownerName:  String,
  email: String,
  password:  String,
  locationName:  String,
  mobile: String,
  latitude: Number,
  longitude: Number,
  userType: String,
},
{

    collection: "FuelStationInfo",
}


);

 mongoose.model('FuelStationInfo', fuelStationSchema);
