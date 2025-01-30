import React from "react";
import { Button } from '@mui/material';
import { useJsonData } from '../features/api';
import { useSelector } from 'react-redux';

export function WikiContent() {
    const { jsonData, loading, error } = useJsonData();
    const timestamp = useSelector((state) => state.film.timestamp); // Récupération du timestamp

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    // Trier les mots-clés par ordre croissant de pos
    const sortedKeywords = [...jsonData.Keywords].sort((a, b) => a.pos - b.pos);

    // Trouver la plus grande pos qui est <= timestamp
    const lastKeyword = sortedKeywords.reduce((prev, curr) => {
        return curr.pos <= timestamp ? curr : prev;
    }, sortedKeywords[0]); // Initialisation avec le premier élément

    return (
        <div>
            <h2>Wiki</h2>
            {lastKeyword ? (
                <div key={lastKeyword.pos}>
                    {/* Affiche un bouton pour chaque mot-clé trouvé */}
                    Position {lastKeyword.pos} secondes :
                    {lastKeyword.data.map((item, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            onClick={() => window.open(item.url, "_blank")}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            ) : (
                <p>Aucun mot-clé disponible.</p>
            )}
        </div>
    );
}

export default WikiContent;
