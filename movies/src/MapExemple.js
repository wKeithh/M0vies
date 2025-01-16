import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corriger le problème des icônes par défaut dans Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapExample = ({ waypoints }) => {
  const defaultPosition = [51.505, -0.09]; // Position par défaut si aucun waypoint

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={defaultPosition} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {waypoints.map((waypoint, index) => (
          <Marker key={index} position={[parseFloat(waypoint.lat), parseFloat(waypoint.lng)]}>
            <Popup>
              <strong>{waypoint.label}</strong>
              <br />
              Timestamp : {waypoint.timestamp}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapExample;
