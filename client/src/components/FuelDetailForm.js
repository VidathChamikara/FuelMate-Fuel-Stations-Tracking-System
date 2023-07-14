import React, { Component } from 'react';

export default class FuelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nDesel: 0,
      sDesel: 0,
      nPetrol: 0,
      sPetrol: 0,
      activeTab: 'dashboard',
      fuelDetails: "", // Added state for fuelDetails
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/fuelDetails", {
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
        console.log(data, "fuelData");
        this.setState({ fuelDetails: data.data });
        if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();         
        }
      });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { nDesel, sDesel, nPetrol, sPetrol } = this.state;
    console.log(nDesel, sDesel, nPetrol, sPetrol);
    fetch('http://localhost:5000/fuel', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
        nDesel,
        sDesel,
        nPetrol,
        sPetrol,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'Data pass to API');
        if (data.status === "Already Added Data") {
          alert("Already Added Data");
        } else if (data.status === "ok") {
          alert("Successfully Sign Up");
        }
        window.location.reload();
      });  
  }

  renderForm() {
    const { fuelDetails } = this.state;
    const data = fuelDetails[0];
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Fuel Details</h3>

        <div className="mb-3">
          <label>Normal Diesel (L)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Normal Diesel Quantity"                        
            onChange={(e) => this.setState({ nDesel: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Super Diesel (L)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Super Diesel Quantity"
            onChange={(e) => this.setState({ sDesel: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Normal Petrol (L)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Normal Petrol Quantity"
            onChange={(e) => this.setState({ nPetrol: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Super Petrol (L)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Super Petrol Quantity"
            onChange={(e) => this.setState({ sPetrol: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }

  renderFuelDetails() {
    const { fuelDetails } = this.state;

  // Check if fuelDetails is empty or not
  if (fuelDetails.length === 0) {
    return <div>Not Added Data....</div>; // or display a loading message
  }

  const data = fuelDetails[0];
    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Normal Desel</h5>
              <p className="card-text">Quantity: {data.nDesel} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Super Desel</h5>
              <p className="card-text">Quantity: {data.sDesel} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">NormalPetrol</h5>
              <p className="card-text">Quantity: {data.nPetrol} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Super Petrol</h5>
              <p className="card-text">Quantity:  {data.sPetrol} liters</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => this.setState({ activeTab: 'form' })}
            >
              Form
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => this.setState({ activeTab: 'dashboard' })}
            >
              Dashboard
            </button>
          </li>
        </ul>

        {activeTab === 'form' ? this.renderForm() : this.renderFuelDetails()}
        <p className="forgot-password text-right">
          <a href="/fuelStationHome">Back To Home</a>
        </p>
      </div>
    );
  }
}
