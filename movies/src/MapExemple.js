import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchJsonData } from "./api"; // Import de la fonction depuis api.js

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

const MapExample = () => {
  const [jsonData, setJsonData] = useState(null); // Pour stocker le fichier JSON complet
  const [waypoints, setWaypoints] = useState([]); // Pour les waypoints extraits
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJsonData = async () => {
      try {
        const data = await fetchJsonData(); // Récupère tout le JSON
        setJsonData(data); // Stocke le JSON complet
        if (data && data.Waypoints) {
          setWaypoints(data.Waypoints); // Extrait les waypoints si disponibles
        } else {
          console.warn("Aucune donnée Waypoints trouvée !");
        }
      } catch (err) {
        setError("Erreur lors du chargement des données JSON");
      } finally {
        setLoading(false);
      }
    };

    loadJsonData();
  }, []);

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1>Carte des Waypoints</h1>
      <MapContainer
        center={[40, -95]} // Centrer la carte approximativement
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={[
              parseFloat(waypoint.lat),
              parseFloat(waypoint.lng),
            ]}
          >
            <Popup>
              <strong>{waypoint.label}</strong>
              <br />
              Timestamp: {waypoint.timestamp}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapExample;
