const mongoose = require('mongoose');

const fuelStationSchema = new mongoose.Schema({
  fuelStationName: String,
  ownerName:  String,
  locationName:  String,
  latitude: Number,
  longitude: Number, 
},
{

    collection: "FuelStationInfo",
}


);

 mongoose.model('FuelStationInfo', fuelStationSchema);
