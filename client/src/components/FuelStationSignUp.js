import React, { Component } from 'react'

export default class FuelStationSignUp extends Component {
  constructor(props){
    super(props);
    this.state = {

      fuelStationName : "",
      ownerName : "",
      email : "",
      password : "",
      location : "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const { fuelStationName, ownerName, email, password, location} = this.state;
    console.log(fuelStationName, ownerName, email, password, location);
    fetch("http://localhost:5000/fuel-station/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fuelStationName, 
        ownerName, 
        email,
        password, 
        location
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister"); });

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Fuel Station Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Fuel Station name"
            onChange={(e) => this.setState({ fuelStationName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Owner Name</label>
          <input type="text" className="form-control" placeholder="Owner name"  onChange={(e) => this.setState({ ownerName: e.target.value })}/>
         
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input type="text" className="form-control" placeholder="Location" onChange={(e) => this.setState({ location: e.target.value })} />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}