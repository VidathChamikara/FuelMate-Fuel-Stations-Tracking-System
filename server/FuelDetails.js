const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
    nDesel: Number,
    sDesel: Number,
    nPetrol: Number,
    sPetrol: Number,
},
{

    collection: "FuelInfo",
}


);

 mongoose.model('FuelInfo', fuelSchema);