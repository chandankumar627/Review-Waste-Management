import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Recycle } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: 'var(--radius-lg)'
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
    return <div className="error">Error loading Maps. Please provide a valid API key in .env.</div>;
  }

  if (!isLoaded) {
    return <div className="loading">Loading Map...</div>;
  }

  // If no API key is provided, show a polite placeholder message.
  if(!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{padding: '50px', textAlign: 'center', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', marginTop: '20px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)'}}>
        <h2 style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
          <MapPin size={24} color="var(--color-primary)"/> Nearby Recycling Centers
        </h2>
        <p style={{color: 'var(--color-text-muted)', marginTop: '15px'}}>
          Google Maps API Key not detected. Please add <code>REACT_APP_GOOGLE_MAPS_API_KEY</code> to your <code>frontend/.env</code> file to enable location features.
        </p>
      </div>
    );
  }

  // Note: Standard Google Maps Marker only supports simple text labels or custom icons via URL. 
  // We will use standard label options without emojis.
  return (
    <div className="map-container" style={{padding: '0 0 20px 0'}}>
      <h2 style={{display:'flex', alignItems:'center', gap:'10px', marginBottom: '20px'}}>
        <MapPin size={28} color="var(--color-primary)"/> Nearby Recycling Centers
      </h2>
      <div style={{boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={center} label="U" title="You are here" />
          
          {mockLocations.map((loc, idx) => (
            <Marker key={idx} position={{lat: loc.lat, lng: loc.lng}} label="R" title={loc.name} />
          ))}
          <></>
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapLocator;
