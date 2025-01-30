import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { Player, BigPlayButton } from 'video-react';
import { useJsonData } from '../Features/api';
import { useVideo } from '../Features/filmSlice';
import "../../node_modules/video-react/dist/video-react.css";

export function Lecteur() {
    const { jsonData, loading, error } = useJsonData();
    const { timestamp, setTimestamp, playerRef } = useVideo();

    const videoSrc = "/film.mp4";
    const [activeButtonId, setActiveButtonId] = useState(null);

    const handleButtonClick = (timestamp) => {
        setActiveButtonId(timestamp);
        if (playerRef.current) {
            playerRef.current.seek(timestamp); // Déplace la vidéo au timestamp sélectionné
        }
    };

    useEffect(() => {
        const updateTimestamp = () => {
            if (playerRef.current) {
                setTimestamp(playerRef.current.getState().player.currentTime);
            }
        };

        if (playerRef.current) {
            playerRef.current.subscribeToStateChange(updateTimestamp);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.unsubscribeToStateChange(updateTimestamp);
            }
        };
    }, [playerRef]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            {jsonData.Chapters.map((chapter) => (
                <Button
                    key={chapter.pos}
                    variant={activeButtonId === chapter.pos ? "contained" : "outlined"}
                    onClick={() => handleButtonClick(chapter.pos)}
                >
                    {chapter.title}
                </Button>
            ))}

            <Player ref={playerRef} playsInline poster="/poster.png" src={videoSrc} aspectRatio='auto'>
                <BigPlayButton position="center" />
            </Player>
        </div>
    );
}
