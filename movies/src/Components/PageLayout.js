import MapExample from "./MapExemple";
import WikiContent from "./WikiContent";
import { Lecteur } from "./Lecteur";

const PageLayout = () => {

  return (
    <div style={styles.container}>
      {/* Lecteur vidéo */}
      <div style={styles.videoPlayer}>
        <Lecteur/>
      </div>

      {/* Chat */}
      <div style={styles.chat}>
        <h2>Chat</h2>
        {/* Contenu du chat */}
      </div>

      {/* Contenu Wikipédia */}
      <div style={styles.wikiContent}>
        <WikiContent/>
      </div>

      {/* Carte */}
      <div style={styles.map}>
        <MapExample/>
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
  },
  map: {
    gridColumn: "2 / 3", // Dans la colonne de droite
    gridRow: "2 / 4",
    height: "200px", // Hauteur fixe pour la carte
    backgroundColor: "#ccc",
  },
};

export default PageLayout;
