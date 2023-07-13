import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationMap = () => {
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
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

  const deleteLocation = async (locationId) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/location/${locationId}`, {
        data: { token },
      });
      const data = response.data;

      if (data.status === 'ok') {
        alert('Location deleted successfully');
        window.location.href = "./locationForm";
      } else {
        alert('Failed to delete location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
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
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    renderMap();
  }, [locations]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'map') {
      return <div id="map" style={{ height: '400px', width: '100%' }} />;
    } else if (activeTab === 'table') {
      if (Array.isArray(locations)) {
        return (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Date & Time</th>
                <th>Location Name</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td>{location.currentDateTime}</td>
                  <td>{location.locationName}</td>
                  <td>
                    <button className="btn btn-danger"onClick={() => deleteLocation(location._id)}>Delete</button>
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
              Table
            </button>
          </li>
        </ul>
      </nav>
      {renderContent()}
      <p className="forgot-password text-right">
        <a href="/userHome">Back To Home</a>
      </p>
    </div>
  );
};

export default LocationMap;
