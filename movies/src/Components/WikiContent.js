import React, { useState } from "react";
import { Button } from '@mui/material';
import { useJsonData } from '../Features/api';


export function WikiContent() {

    const { jsonData, loading, error } = useJsonData();
    const [activeButtonId] = useState(null);


    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            <h2>Wiki</h2>
            {jsonData.Keywords.map((keyword) => (
                <div key={keyword.pos}>
                    {/* Affiche un bouton pour chaque position */}
                    Position {keyword.pos} secondes :
                    {/* Liste des titres */}
                    {keyword.data.map((item, index) => (
                        <Button
                            key={index}
                            variant={activeButtonId === item.title ? "contained" : "outlined"}
                            onClick={() => window.open(item.url, "_blank")}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            ))}
        </div>


    )
}

export default WikiContent;