import React, { useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';
import { Player, BigPlayButton } from 'video-react';
import { useJsonData } from '../features/api';
import { useSelector, useDispatch } from 'react-redux';
import { setTimestamp } from '../features/filmSlice'; // Assure-toi du bon chemin
import "../../node_modules/video-react/dist/video-react.css";

export function Lecteur() {
    const dispatch = useDispatch();
    const videoRef = useRef(null); // Permet d'accéder au lecteur vidéo

    const { jsonData, loading, error } = useJsonData();
    const videoSrc = "/Route_66_-_an_American_badDream_512kb.mp4";

    const [activeButtonId, setActiveButtonId] = useState(0);

    const lastTimestampRef = useRef(null);


    const handleButtonClick = (id) => {
        setActiveButtonId(id);
        if (videoRef.current) {
            videoRef.current.seek(id); // Déplace la vidéo au chapitre sélectionné
        }
    };

    // Fonction qui met à jour le timestamp dans Redux
    const updateTimestamp = () => {
        if (!videoRef.current) return;

        const currentTime = Math.floor(videoRef.current.getState().player.currentTime);
        // Éviter les mises à jour inutiles
        if (lastTimestampRef.current !== currentTime) {
            lastTimestampRef.current = currentTime;
            dispatch(setTimestamp(currentTime));
        }

        // Trouver le chapitre correspondant
        const currentChapter = jsonData.Chapters.find((chapter, idx) => {
            const nextChapter = jsonData.Chapters[idx + 1];
            return nextChapter ? chapter.pos <= currentTime && nextChapter.pos > currentTime : chapter.pos <= currentTime;
        });

        // Mettre à jour l'ID du bouton actif si nécessaire
        if (currentChapter && activeButtonId !== currentChapter.pos) {
            setActiveButtonId(currentChapter.pos);
        }
    };

    const timestamp = useSelector((state) => state.film.timestamp);
    const lastSeekRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && timestamp > 0) {
            const player = videoRef.current.getState().player;

            // Évite les appels inutiles si la position est déjà correcte
            if (lastSeekRef.current !== timestamp && Math.abs(player.currentTime - timestamp) > 0.5) {
                lastSeekRef.current = timestamp;
                videoRef.current.seek(timestamp);
            }
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
