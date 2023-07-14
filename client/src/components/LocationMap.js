import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuelDetailsModal = ({ fuelDetails, onClose }) => {
  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, animation: 'slide-down 0.9s ease-out' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Fuel Details</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true" style={{ color: '#fff' }}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Normal Desel</h5>
              <p className="card-text">Quantity: {fuelDetails.nDesel} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Super Desel</h5>
              <p className="card-text">Quantity: {fuelDetails.sDesel} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">NormalPetrol</h5>
              <p className="card-text">Quantity: {fuelDetails.nPetrol} liters</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{backgroundColor: "#D3D3D3",}}>
            <div className="card-body">
              <h5 className="card-title">Super Petrol</h5>
              <p className="card-text">Quantity:  {fuelDetails.sPetrol} liters</p>
            </div>
          </div>
        </div>
          </div>
         
      </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

const LocationMap = () => {
  const [locations, setLocations] = useState([]);
  const [stationLocations, setStationLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedFuelDetails, setSelectedFuelDetails] = useState(null);

  useEffect(() => {
    fetchMyLocations();
    fetchStationLocations();
  }, []);

  const fetchMyLocations = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/getAllLocation', { token });
      const data = response.data;

      if (data.data === 'token expired') {
        alert('Token expired. Please log in again.');
        window.localStorage.clear();
      } else {
        setLocations(data.data);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchStationLocations = async () => {
    try {
      
      const response = await axios.get('http://localhost:5000/getAllFuelStationLocation');
      const data = response.data;    
      setStationLocations(data.data);      
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

 
  const renderMap = () => {
    // Load the Google Maps API asynchronously
    const script = document.createElement('script');
    script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAOqrItiQtWOcaaNQbtRyVPYlsFuAwV9n0'; // Replace YOUR_API_KEY with your actual API key
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      if (Array.isArray(locations)) {
        locations.forEach((location) => {
          const markerIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'blue',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 7,
          };
          const marker = new window.google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map,
            title: 'My Location',
            icon: markerIcon,
          });
          // Create an InfoWindow with a text field
        const infoWindow = new window.google.maps.InfoWindow({
          content: '<h6>My Location</h6>', // Replace with your desired text or HTML content
        });

        // Show the InfoWindow when marker is clicked
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        infoWindow.open(map, marker);
        });
      }

      if (Array.isArray(stationLocations)) {
        stationLocations.forEach((stationLocation) => {
          const stationMarkerIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 7,
          };
          const stationMarker = new window.google.maps.Marker({
            position: { lat: stationLocation.latitude, lng: stationLocation.longitude },
            map,
            title: 'Fuel Station',
            icon: stationMarkerIcon,
          });
          // Create an InfoWindow with a text field for fuel station
          const stationInfoWindow = new window.google.maps.InfoWindow({
            content: `<h6>${stationLocation.locationName}</h6>`, // Replace with your desired text or HTML content
          });
  
          // Show the InfoWindow when station marker is clicked
          stationMarker.addListener('click', () => {
            stationInfoWindow.open(map, stationMarker);
            handleViewFuelDetails(stationLocation.userId);
          });
          stationInfoWindow.open(map, stationMarker);
        });
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    renderMap();
  }, [locations, stationLocations]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleViewFuelDetails = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5000/fuelDetail', { userId: userId });
      const data = response.data;
  
      if (data.status === 'ok') {
        // Display the fuel details, e.g., in a modal or a separate component
        console.log(data.data); // Replace with the code to show the fuel details
        setSelectedFuelDetails(data.data);
      } else {
        console.error('Error fetching fuel details:', data.data);
      }
    } catch (error) {
      console.error('Error fetching fuel details:', error);
    }
  };
  const handleCloseModal = () => {
    setSelectedFuelDetails(null);
  };

  const renderContent = () => {
    if (activeTab === 'map') {
      return <div id="map" style={{ height: '400px', width: '100%' }} />;
    } else if (activeTab === 'table') {
      if (Array.isArray(stationLocations)) {
        return (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>                
                <th>Fuel Station Name</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {stationLocations.map((location) => (
                <tr key={location._id}>
                  <td>{location.locationName}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleViewFuelDetails(location.userId)}>View</button>
                  </td> {/* Added delete button */}
                </tr>
              ))}
            </tbody>
          </table>
        );
      } else {
        return <p>No locations found.</p>;
      }
    }
  };

  return (
    <div>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => handleTabChange('map')}
            >
              Map
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'table' ? 'active' : ''}`}
              onClick={() => handleTabChange('table')}
            >
              Fuel Stations Table
            </button>
          </li>
        </ul>
      </nav>
      {renderContent()}
      {selectedFuelDetails && (
        // eslint-disable-next-line no-restricted-globals
        <FuelDetailsModal fuelDetails={selectedFuelDetails} locationName={location.locationName} onClose={handleCloseModal} />
      )}
      <p className="forgot-password text-right">
        <a href="/userHome">Back To Home</a>
      </p>
    </div>
  );
};

export default LocationMap;
