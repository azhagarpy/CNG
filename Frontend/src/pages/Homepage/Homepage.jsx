import React, { useState, useEffect } from 'react';
import "./homepage.scss";
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const Homepage = ({ google }) => {
  const [locations, setLocations] = useState([]);
  const [userState, setUserState] = useState(localStorage.getItem('userState'));
  const [userDistrict, setuserDistrict] = useState(localStorage.getItem('userDistrict'));
  const [isHovered, setIsHovered] = useState(false);
  const value = useSelector((state) => state.search.value);

  useEffect(() => {
    if (value !== "xxx") {
      axios.get(`http://127.0.0.1:8000/filter?state=&district=${value}`)
        .then(response => {
          setLocations(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      axios.get(`http://127.0.0.1:8000/filter?state=${userState}&district=${userDistrict}`)
        .then(response => {
          setLocations(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [value, userDistrict]);

  function getByCoordinates(range) {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const data = { lat: latitude, long: longitude, range };

          // Send a POST request to the server
          axios.post("http://127.0.0.1:8000/getnearbystations", data)
            .then(res => {
              // Update state or perform other actions with the response data
              setLocations(res.data);
            })
            .catch(error => {
              // Handle request error
              console.error('Error fetching nearby stations:', error);
            });
        },
        (error) => {
          // Handle geolocation error
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }

  const openGoogleMaps = (lat, lng) => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <div>
      <Navbar />
      {locations.length === 0 ? (
        <p className='loder'>Loading...</p>
      ) : (
        <Map
          google={google}
          zoom={14}
          center={{
            lat: locations[0].STATION_LATITUDE,
            lng: locations[0].STATION_LONGITUDE
          }}
        >
          {locations.map((location,index) => (
            <Marker key={index} position={{ lat: location.STATION_LATITUDE, lng: location.STATION_LONGITUDE }}
    

              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              animation={isHovered ? window.google.maps.Animation.BOUNCE : null}
              onClick={() =>
                openGoogleMaps(location.STATION_LATITUDE, location.STATION_LONGITUDE)
              }
              options={{
                animation: isHovered ? window.google.maps.Animation.BOUNCE : null,
              }}

            />
          ))}
          <img src="./images/accurate-icon.png" alt="near by you" className='ax' onClick={() => { getByCoordinates(10) }} />
        </Map>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYHwSUOuzTJL_iJMPDnGbhfrpWm4JImdQ'
})(Homepage);
