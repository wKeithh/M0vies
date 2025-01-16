import axios from "axios";

const jsonUrl = "https://iai3-react-34db9d7c5920.herokuapp.com/backend";

// Fonction pour récupérer tout le fichier JSON
export const fetchJsonData = async () => {
  try {
    const response = await axios.get(jsonUrl); // Récupère le JSON complet
    return response.data; // Retourne toutes les données
  } catch (err) {
    console.error("Erreur lors de la récupération des données JSON :", err);
    throw err; // Relance l'erreur pour gestion par l'appelant
  }
};
