import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
//Admin 
import AdminHome from "./components/AdminHome";
//User 
import UserHome from "./components/userHome";
import LocationForm from "./components/locationForm";
import LocationMap from "./components/LocationMap";
//FuelStation
import FuelStationHome from "./components/FuelStationHome";
import FuelDetails from "./components/FuelDetailForm";
import StationLocationForm from "./components/stationLocationForm";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Fuel Mate
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={< UserDetails />} />

              <Route path="/adminHome" element={< AdminHome />} />

              <Route path="/userHome" element={< UserHome />} />
              <Route path="/locationForm" element={< LocationForm />} />
              <Route path="/locationMap" element={< LocationMap />} />

              <Route path="/fuelStationHome" element={< FuelStationHome />} />
              <Route path="/fuelDetails" element={< FuelDetails />} />
              <Route path="/stationLocationForm" element={< StationLocationForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
