import React, { Component } from "react";
import petrol from "../images/petrol.jpeg";
import car from "../images/car.png";

export default class UserHome extends Component { constructor(props) {
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
logOut = () => {
  window.localStorage.clear();
  window.location.href = "./sign-in";
};
  render() {
    const { userData } = this.state;
    return (
      <div className="container">
         <div className="row">
          <div className="col-md-12">
            <h3>Welcome, {userData.name}</h3>
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col-md-6">
         
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0.25, 0.25, 0.25)", // Add boxShadow CSS property
                borderRadius: "15px", // Add borderRadius CSS property
                transition: "transform 0.3s", // Add transition CSS property for smooth animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
              }}
            >
              <div className="card-body text-center">
              <a href="/locationMap"> <div className="circle-image">
                  <img src={petrol} alt="Card 1" />
                </div></a>
                <h5 className="card-title">View</h5>
                <p className="card-text">Find fuel station locations</p>
              </div>
            </div>
           
          </div>
          <div className="col-md-6">
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.25)", // Add boxShadow CSS property
                borderRadius: "15px", // Add borderRadius CSS property
                transition: "transform 0.3s", // Add transition CSS property for smooth animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
              }}
            >
              <div className="card-body text-center">
              <a href="/locationForm"><div className="circle-image">
                  <img src={car} alt="Card 2" />
                </div></a>
                <h5 className="card-title">Add</h5>
                <p className="card-text">Add your current locations</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
}
