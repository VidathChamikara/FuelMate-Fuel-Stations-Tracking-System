import React, { Component } from "react";
import UserHome from "./userHome";
import AdminHome from "./AdminHome";
import FuelStationHome from "./FuelStationHome";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      admin: false,
      fuelStation: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType === "Admin") {
          this.setState({ admin: true });
        }
        if (data.data.userType === "Fuel Station") {
          this.setState({ fuelStation: true });
        }
        this.setState({ userData: data.data });
        if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  render() {
    const { admin, fuelStation, userData } = this.state;

    return (
      <div>
        {admin ? (
          <AdminHome />
        ) : fuelStation ? (
          <FuelStationHome  />
        ) : (
          <UserHome />
        )}
      </div>
    );
  }
}

