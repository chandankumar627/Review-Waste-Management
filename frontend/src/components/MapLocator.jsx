import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px'
};

// Default center (San Francisco)
const center = {
  lat: 37.7749,
  lng: -122.4194
};

// Dummy locations for demonstration
const mockLocations = [
  { lat: 37.7749, lng: -122.4194, name: 'Main Recycling Center' },
  { lat: 37.7849, lng: -122.4094, name: 'E-Waste Dropoff' },
  { lat: 37.7649, lng: -122.4294, name: 'Community Compost Bin' }
];

const MapLocator = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="map-error">Error loading Maps. Please provide a valid API key in .env.</div>;
  }

  if (!isLoaded) {
    return <div className="loading">Loading Map...</div>;
  }

  // If no API key is provided, show a polite placeholder message.
  if(!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{padding: '50px', textAlign: 'center', background: 'white', borderRadius: '12px', marginTop: '20px'}}>
        <h2>📍 Nearby Recycling Centers</h2>
        <p style={{color: '#6b7280', marginTop: '10px'}}>
          Google Maps API Key not detected. Please add <code>REACT_APP_GOOGLE_MAPS_API_KEY</code> to your <code>frontend/.env</code> file to enable location features.
        </p>
      </div>
    );
  }

  return (
    <div className="map-container" style={{padding: '20px'}}>
      <h2>📍 Nearby Recycling Centers</h2>
      <div style={{marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={center} label="You" />
          
          {mockLocations.map((loc, idx) => (
            <Marker key={idx} position={{lat: loc.lat, lng: loc.lng}} label="♻️" title={loc.name} />
          ))}
          <></>
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapLocator;
