import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useJsonData } from "../features/api";
import { useSelector, useDispatch } from "react-redux";
import markerBlue from "leaflet/dist/images/marker-icon.png";
import markerRed from "leaflet/dist/images/marker-icon-red.png";
import markerGray from "leaflet/dist/images/marker-icon-grey.png";
import { setTimestamp } from '../features/filmSlice'; // Assure-toi du bon chemin

const icons = {
  gray: L.icon({ iconUrl: markerGray, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
  red: L.icon({ iconUrl: markerRed, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
  blue: L.icon({ iconUrl: markerBlue, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
};

// Centrer la carte une seule fois au début
function FitBoundsOnce({ waypoints, setUserInteracted }) {
  const map = useMap();
  const hasCentered = useRef(false);

  useEffect(() => {
    if (!hasCentered.current && waypoints.length > 0) {
      const bounds = L.latLngBounds(waypoints.map(wp => [wp.lat, wp.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
      hasCentered.current = true;
    }
  }, [waypoints, map]);

  return null;
}

// Gérer les interactions utilisateur (pour bloquer le recentrage après un zoom/déplacement)
function MapEventHandler({ setUserInteracted }) {
  useMapEvent("movestart", () => setUserInteracted(true));
  useMapEvent("zoomstart", () => setUserInteracted(true));
  return null;
}

export function MapExample() {
  const { jsonData, loading, error } = useJsonData();
  const timestamp = useSelector((state) => state.film.timestamp);
  const dispatch = useDispatch();
  const [userInteracted, setUserInteracted] = useState(false);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  // Convertir les données en format utilisable
  const waypoints = jsonData.Waypoints.map(wp => ({
    ...wp,
    timestamp: Number(wp.timestamp),
    lat: Number(wp.lat),
    lng: Number(wp.lng)
  }));

  // Trouver le waypoint actif
  let activeWaypoint = null;
  for (let i = 0; i < waypoints.length; i++) {
    if (waypoints[i].timestamp <= timestamp) {
      activeWaypoint = waypoints[i];
    } else {
      break;
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[0, 0]} // Position par défaut
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Détecter les interactions utilisateur */}
        <MapEventHandler setUserInteracted={setUserInteracted} />

        {/* Centrer la carte une seule fois au chargement */}
        <FitBoundsOnce waypoints={waypoints} setUserInteracted={setUserInteracted} />

        {waypoints.map((waypoint, index) => {
          let icon = icons.gray;
          if (waypoint.timestamp < timestamp) {
            icon = icons.blue;
          }
          if (waypoint === activeWaypoint) {
            icon = icons.red;
          }

          return (
            <Marker
              key={index}
              position={[waypoint.lat, waypoint.lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  dispatch(setTimestamp(waypoint.timestamp));
                  console.log("Waypoint cliqué : ",waypoint.timestamp, "seconde(s)")
                }
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapExample;
