const express = require('express')
const mongoose = require('mongoose');
//const FuelStation = require('./fuelStationS');
const app = express()
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://ChamudiChanuki99:Chamudi99@fuelmate.fcjo4oj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  require("./FuelStationDetails");
  const FuelStation = mongoose.model("FuelStationInfo");
  
  app.post("/fuel-station/register", async (req, res) => {
    const { fuelStationName, ownerName, email, password, location } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await FuelStation.findOne({ email }).collation({}); // Check for existing Fuel Station
  
      if (oldUser) {
        return res.json({ error: "Fuel Station Exists" });
      }
      await FuelStation.create({
        fuelStationName,
        ownerName,
        email,
        password: encryptedPassword,
        location,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });
  
  require("./FuelDetails");
  const Fuel = mongoose.model("FuelInfo");
  app.post("/fuel", async (req, res) => {
  const { nDesel, sDesel, nPetrol, sPetrol } = req.body;
  try{
      await Fuel.create({
        nDesel,
        sDesel,
        nPetrol,
        sPetrol,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  
  });
app.listen(5000, () => { console.log("Server started on port 5000")}) //define which port to run server(npm run dev)