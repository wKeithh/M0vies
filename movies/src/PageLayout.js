import React, { useState, useEffect } from "react";
import MapExample from "./MapExemple";
import axios from "axios";
const PageLayout = () => {
     const [film, setFilm] = useState([]);
      const [chapters, setChapters] = useState([]);
      const [waypoints, setWaypoints] = useState([]);
      const [keywords, setKeywords] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://iai3-react-34db9d7c5920.herokuapp.com/backend");
            const data = response.data;
            // Extraire Film
            if (data.Film){
              setFilm(data.Film);
            }

            // Extraire les chapitres
            if (data.Chapters){
              setChapters(data.Chapters);
            }

            // Extraire les waypoints
            if (data.Waypoints) {
              setWaypoints(data.Waypoints);
            }

            // Extraire les Keywords
            if (data.Keywords){
              setKeywords(data.Keywords);
            }

          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
          }
        };

        fetchData();
      }, []);


  return (
    <div style={styles.container}>
      {/* Lecteur vidéo */}
      <div style={styles.videoPlayer}>
        <h2>Lecteur Vidéo</h2>
        {/* Espace réservé pour le lecteur vidéo */}
      </div>

      {/* Chat */}
      <div style={styles.chat}>
        <h2>Chat</h2>
        {/* Contenu du chat */}
      </div>

      {/* Contenu Wikipédia */}
      <div style={styles.wikiContent}>
        <h2>Contenu Wikipédia</h2>
        <p>Contenu chargé depuis Wikipédia sera affiché ici.</p>
      </div>

      {/* Carte */}
      <div style={styles.map}>
        <MapExample waypoints={waypoints} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr", // Vidéo prend 3 parts, chat 1 part
    gridTemplateRows: "3fr 1fr", // Hauteur adaptative pour vidéo et contenu
    gap: "10px",
    height: "100vh",
    padding: "10px",
  },
  videoPlayer: {
    gridColumn: "1 / 2", // Occupe toute la première colonne
    gridRow: "1 / 2",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    gridColumn: "2 / 3", // Occupe la deuxième colonne
    gridRow: "1 / 3", // S'étend sur deux lignes (à droite)
    backgroundColor: "#f1f1f1",
    padding: "10px",
    overflowY: "auto",
  },
  wikiContent: {
    gridColumn: "1 / 2",
    gridRow: "2 / 3", // En dessous de la vidéo
    backgroundColor: "#e8e8e8",
    padding: "10px",
    overflowY: "auto",
  },
  map: {
    gridColumn: "2 / 3", // Dans la colonne de droite
    gridRow: "2 / 4",
    height: "200px", // Hauteur fixe pour la carte
    backgroundColor: "#ccc",
  },
};

export default PageLayout;
