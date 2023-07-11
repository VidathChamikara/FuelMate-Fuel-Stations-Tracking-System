import React, { Component } from "react";
import petrol from "../images/petrol.jpeg";
import station from "../images/Station.png";

export default class FuelStationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
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
        this.setState({ userData: data.data });
        if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }

  render() {
    const { userData } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Welcome, {userData.name}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0.25, 0.25, 0.25)",
                borderRadius: "15px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="card-body text-center">
                <a href="/fuelDetails">
                  <div className="circle-image">
                    <img src={petrol} alt="Card 1" />
                  </div>
                </a>
                <h5 className="card-title">Fuel Type Details</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.25)",
                borderRadius: "15px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="card-body text-center">
                <a href="">
                  <div className="circle-image">
                    <img src={station} alt="Card 2" />
                  </div>
                </a>
                <h5 className="card-title">Fuel Station Details</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
