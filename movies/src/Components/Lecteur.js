import React, { useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';
import { Player, BigPlayButton } from 'video-react';
import { useJsonData } from '../features/api';
import { useDispatch,useSelector } from 'react-redux';
import { setTimestamp } from '../features/filmSlice'; // Assure-toi du bon chemin
import "../../node_modules/video-react/dist/video-react.css";

export function Lecteur() {
    const dispatch = useDispatch();
    const videoRef = useRef(null); // Permet d'accéder au lecteur vidéo

    const { jsonData, loading, error } = useJsonData();
    const videoSrc = "/film.mp4";

    const [activeButtonId, setActiveButtonId] = useState(null);

    const handleButtonClick = (id) => {
        setActiveButtonId(id);
        if (videoRef.current) {
            videoRef.current.seek(id); // Déplace la vidéo au chapitre sélectionné
        }
    };

    // Fonction qui met à jour le timestamp dans Redux
    const updateTimestamp = () => {
        if (videoRef.current) {
            dispatch(setTimestamp(videoRef.current.getState().player.currentTime));
        }
    };

    const timestamp = useSelector((state) => state.film.timestamp);

    useEffect(() => {
        if (videoRef.current && timestamp > 0) {
            videoRef.current.seek(timestamp); // Déplace la vidéo au timestamp cliqué
        }
    }, [timestamp]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            {jsonData.Chapters.map((chapter) => (
                <Button
                    key={chapter.pos}
                    variant={activeButtonId === chapter.pos ? "contained" : "outlined"}
                    onClick={() => handleButtonClick(chapter.pos)}>
                    {chapter.title}
                </Button>
            ))}

            <Player
                ref={videoRef}
                playsInline
                poster="/poster.png"
                src={videoSrc}
                aspectRatio="auto"
                onTimeUpdate={updateTimestamp} // Appelle la fonction à chaque mise à jour du temps
            >
                <BigPlayButton position="center" />
            </Player>
        </div>
    );
}
