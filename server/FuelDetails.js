const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
        required: true,
      },
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