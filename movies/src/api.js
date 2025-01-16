import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const JsonDataContext = createContext();

const jsonUrl = "https://iai3-react-34db9d7c5920.herokuapp.com/backend";

export const JsonDataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await axios.get(jsonUrl);
        setJsonData(response.data); // Enregistre les données JSON
      } catch (err) {
        setError("Erreur lors de la récupération des données JSON");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJsonData();
  }, []);

  return (
    <JsonDataContext.Provider value={{ jsonData, loading, error }}>
      {children}
    </JsonDataContext.Provider>
  );
};

// Hook personnalisé pour accéder aux données JSON
export const useJsonData = () => {
  return useContext(JsonDataContext);
};
