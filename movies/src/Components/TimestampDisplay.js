import React from 'react';
import { useSelector } from 'react-redux';

export function TimestampDisplay() {
    const timestamp = useSelector((state) => state.film.timestamp); // Récupération du timestamp

    return (
        <div>
            <h3>Timestamp actuel : {timestamp.toFixed(2)}s</h3> {/* Affichage formaté */}
        </div>
    );
}
