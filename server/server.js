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

  //fuelStation methods

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

  //User Methods

  require("./userDetails");

  const User = mongoose.model("UserInfo");
  app.post("/register", async (req, res) => {
    const { fname, lname, email, password, mobile, userType } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    try {
      const oldUser = await User.findOne({ email }).collation({});
  
      if (oldUser) {
        return res.send({ status: "User Exists" });
      }
  
      User.create({
        fname,
        lname,
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

  //Login

  app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).collation({});
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
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
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
      const usermail = user.email;
      User.findOne({ email: usermail })
        .collation({})
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
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