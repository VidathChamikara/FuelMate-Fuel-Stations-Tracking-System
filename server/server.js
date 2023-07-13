const express = require('express')
const mongoose = require('mongoose');
//const FuelStation = require('./fuelStationS');
const app = express()
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://vidathamarasekara99:vidath99@fuelmate.fcjo4oj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  //fuelStation methods(Chamudi)

  require("./FuelStationDetails");
  const FuelStation = mongoose.model("FuelStationInfo");
  
  app.post("/fuel-station/register", async (req, res) => {
    const { fuelStationName, ownerName, email, password, locationName, mobile, latitude,  longitude, userType } = req.body;
  
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
        locationName,
        mobile,
        latitude,
        longitude,
        userType,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });
  
  require("./FuelDetails");
  const Fuel = mongoose.model("FuelInfo");
  app.post("/fuel", async (req, res) => {
    const { token, nDesel, sDesel, nPetrol, sPetrol } = req.body;
    
    try {
      const user = jwt.verify(token, JWT_SECRET);
      
      const { email } = user;
      
      const fuelStationUser = await User.findOne({ email }).collation({});
      
      if (!fuelStationUser) {
        return res.send({ status: "error", data: "Fuel station user not found" });
      }

      const oldData = await Fuel.findOne({ fuelStationUser }).collation({});
  
      if (oldData) {
        return res.send({ status: "Already Added Data" });
      }
  
      
      await Fuel.create({
        userId: fuelStationUser._id,
        nDesel,
        sDesel,
        nPetrol,
        sPetrol,
      });
      
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  });
  
  app.post("/fuelDetails", async (req, res) => {
    const { token }=req.body;
  
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return "token expired";
        }
        return decodedToken;
      });
  
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
      const { email } = user;
  
      const fuelStationUser = await User.findOne({ email }).collation({});
      if (!fuelStationUser) {
        return res.send({ status: "error", data: "Fuel station user not found" });
      }
  
      const fuelDetails = await Fuel.find({ userId: fuelStationUser._id });
      res.send({ status: "ok", data: fuelDetails });
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  });
  

  //User Methods

  require("./userDetails");

  const User = mongoose.model("UserInfo");
  app.post("/register", async (req, res) => {
    const { name, email, password, mobile, userType } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    try {
      const oldUser = await User.findOne({ email }).collation({});
  
      if (oldUser) {
        return res.send({ status: "User Exists" });
      }
  
      User.create({
        name,
        email,
        password: encryptedPassword,
        mobile,
        userType,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  app.get("/getAllUser", async (req, res) => {
    try {
      const allUser = await User.find({}).collation({});
      res.send({ status: "ok", data: allUser });
    } catch (error) {
      console.log(error);
    }
  });

  //UserLocation

require("./myLocation");
const Location = mongoose.model("myLocationInfo");
app.post("/location", async (req, res) => {
  const { token, latitude, longitude, currentDateTime, locationName } = req.body;
  try {

    const user = jwt.verify(token, JWT_SECRET);
      
      const { email } = user;
      
      const fuelStationUser = await User.findOne({ email }).collation({});
      
      if (!fuelStationUser) {
        return res.send({ status: "error", data: "Fuel station user not found" });
      }

    const oldLocation = await Location.findOne({  userId: fuelStationUser._id,latitude,longitude }).collation({});

    if (oldLocation) {
      return res.send({ status: "Location Exists" });
    }
    Location.create({
      userId: fuelStationUser._id,
      latitude,
      longitude,
      currentDateTime,
      locationName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/getAllLocation", async (req, res) => {
  const { token }=req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return "token expired";
      }
      return decodedToken;
    });

    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const { email } = user;

    const fuelStationUser = await User.findOne({ email }).collation({});
    if (!fuelStationUser) {
      return res.send({ status: "error", data: "Fuel station user not found" });
    }
    const allLocation = await Location.find({ userId: fuelStationUser._id }).collation({});
    res.send({ status: "ok", data: allLocation });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/location/:id", async (req, res) => {
  const { token } = req.body;
  const locationId = req.params.id;

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return "token expired";
      }
      return decodedToken;
    });

    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const { email } = user;

    const fuelStationUser = await User.findOne({ email }).collation({});
    if (!fuelStationUser) {
      return res.send({ status: "error", data: "Fuel station user not found" });
    }

    const location = await Location.findById(locationId).collation({});
    if (!location) {
      return res.send({ status: "error", data: "Location not found" });
    }

    if (location.userId.toString() !== fuelStationUser._id.toString()) {
      return res.send({ status: "error", data: "Unauthorized to delete this location" });
    }

    await Location.findByIdAndDelete(locationId).collation({});

    res.send({ status: "ok", data: "Location deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", data: "An error occurred" });
  }
});


  //Login

  app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).collation({});
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "60m",
      });
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  });

  app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return "token expired";
        }
        return decodedToken;
      });
  
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const { email } = user;
  
      User.findOne({ email })
        .collation({})
        .then((data) => {
          if (data) {
            res.send({ status: "ok", data });
          } else {
            res.send({ status: "error", data: "User not found" });
          }
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {
      res.send({ status: "error", data: error.message });
    }
  });
  
  //forgot password

  app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email }).collation({});
      if (!oldUser) {
        return res.json({ status: "User Not Exits!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      console.log(link);
    } catch (error) {}
  });
  
  app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });

 

app.listen(5000, () => { console.log("Server started on port 5000")}) //define which port to run server(npm run dev)