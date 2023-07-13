import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";

class StationLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      currentDateTime: "",
      locationName:"",
      allLocations: [], // Added state for storing all locations
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentDateTime = format(new Date(), "MMMM dd, yyyy - HH:mm:ss");
          this.setState({ latitude, longitude, currentDateTime });
        },
        (error) => {
          this.setState({ error: error.message });
        }
      );
    } else {
      this.setState({ error: "Geolocation is not supported by this browser." });
    }
    // Fetch all locations
    this.getAllLocations();
  }

  getAllLocations = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getStationLocation", {
        token: window.localStorage.getItem("token"),
      });

      if (response.data.status === "ok") {
        this.setState({ allLocations: response.data.data });
      } else {
        console.log("Error fetching locations.");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  handleLocationNameChange = (e) => {
    this.setState({ locationName: e.target.value });
  };
  

  handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude, currentDateTime, locationName } = this.state;
  
    try {
      const response = await axios.post("http://localhost:5000/stationLocation", {
        token: window.localStorage.getItem('token'),
        latitude,
        longitude,
        currentDateTime,
        locationName,
      });
  
      if (response.data.status === "Location Exists") {
        alert("Fuel Station Location Exists");
      } else if (response.data.status === "ok") {
        alert("Successfully Added Location");
       
      } else {
        alert("Error storing location.");
      }
       window.location.href = "./stationLocationForm";
    } catch (error) {
      console.error("Error storing location:", error);
      alert("Error storing location.");
    }
  };
  

  render() {
    const currentDateTime = format(new Date(), "MMMM dd, yyyy - HH:mm:ss");
    const { latitude, longitude, error, locationName, allLocations } = this.state;
   

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (latitude && longitude) {
      return (
        <div>
          <p>
            <strong>Current Date and Time:</strong> {currentDateTime}
          </p>
          <p>
            <strong>Latitude:</strong> {latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {longitude}
          </p>
          <form onSubmit={this.handleSubmit}>
          <div  className="mb-3">
            <label htmlFor="locationName" className="form-label">Fuel Station Name:</label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={this.handleLocationNameChange}
              className="form-control"
            />
          </div>
            <button className="btn btn-outline-primary" type="submit">
              Add  Fuel Station Location
            </button>
           
          </form>
          {allLocations.length > 0 && (
            <div>
              
              <p>If you are willing to add new location please delete past locations!!!</p>
              <h5>Past Locations</h5>
              <table  className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allLocations.map((location) => (
                    <tr key={location._id}>
                      <td>{location.locationName}</td>
                      <td>{location.latitude}</td>
                      <td>{location.longitude}</td>
                      <td>
                    <button className="btn btn-danger"onClick={() => this.deleteLocation(location._id)}>Delete</button>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
           <p className="forgot-password text-right">
          <a href="/fuelStationHome">Back To Home</a>
        </p>
        </div>
      );
    }

    return <p>Loading...</p>;
  }
}

export default StationLocationForm;