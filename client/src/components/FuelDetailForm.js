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
      editMode: false, // Add the editMode state variable
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
          alert("Successfully Added");
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
    const { fuelDetails, editMode } = this.state;
  
    // Check if fuelDetails is empty or not
    if (fuelDetails.length === 0) {
      return <div>Not Added Data....</div>; // or display a loading message
    }
  
    const data = fuelDetails[0];
  
    const handleEdit = () => {
      this.setState({ editMode: true });
    };
  
    const handleCancel = () => {
      this.setState({ editMode: false });
    };
  
    const handleUpdate = () => {
      const { nDesel, sDesel, nPetrol, sPetrol } = data;
      // Perform update API call using the updated values
      fetch('http://localhost:5000/fuelUpdate', {
        method: 'PUT', // Assuming the API uses PUT method for updating fuel details
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
          fuelDetails: { nDesel, sDesel, nPetrol, sPetrol },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'Data updated');
          if (data.status === 'ok') {
            alert('Fuel details updated successfully');
            this.setState({ editMode: false });
          } else {
            alert('Failed to update fuel details');
          }
        })
        .catch((error) => {
          console.error('Error updating fuel details:', error);
          alert('An error occurred while updating fuel details');
        });
    };
  
    const renderFuelCard = () => {
      return (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#D3D3D3' }}>
              <div className="card-body">
                <h5 className="card-title">Normal Diesel</h5>
                {editMode ? (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Normal Diesel Quantity"
                    value={data.nDesel}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState((prevState) => ({
                        fuelDetails: [
                          {
                            ...prevState.fuelDetails[0],
                            nDesel: value,
                          },
                        ],
                      }));
                    }}
                  />
                ) : (
                  <p className="card-text">Quantity: {data.nDesel} liters</p>
                )}
                {editMode ? (
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#D3D3D3' }}>
              <div className="card-body">
                <h5 className="card-title">Super Diesel</h5>
                {editMode ? (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Super Diesel Quantity"
                    value={data.sDesel}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState((prevState) => ({
                        fuelDetails: [
                          {
                            ...prevState.fuelDetails[0],
                            sDesel: value,
                          },
                        ],
                      }));
                    }}
                  />
                ) : (
                  <p className="card-text">Quantity: {data.sDesel} liters</p>
                )}
                {editMode ? (
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#D3D3D3' }}>
              <div className="card-body">
                <h5 className="card-title">Normal Petrol</h5>
                {editMode ? (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Normal Petrol Quantity"
                    value={data.nPetrol}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState((prevState) => ({
                        fuelDetails: [
                          {
                            ...prevState.fuelDetails[0],
                            nPetrol: value,
                          },
                        ],
                      }));
                    }}
                  />
                ) : (
                  <p className="card-text">Quantity: {data.nPetrol} liters</p>
                )}
                {editMode ? (
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card" style={{ backgroundColor: '#D3D3D3' }}>
              <div className="card-body">
                <h5 className="card-title">Super Petrol</h5>
                {editMode ? (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Super Petrol Quantity"
                    value={data.sPetrol}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState((prevState) => ({
                        fuelDetails: [
                          {
                            ...prevState.fuelDetails[0],
                            sPetrol: value,
                          },
                        ],
                      }));
                    }}
                  />
                ) : (
                  <p className="card-text">Quantity: {data.sPetrol} liters</p>
                )}
                {editMode ? (
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Render other fuel cards similarly */}
        </div>
      );
    };
  
    return renderFuelCard();
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
