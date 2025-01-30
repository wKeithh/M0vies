import React, { useState } from "react";
import { Button } from '@mui/material';
import { Player, BigPlayButton } from 'video-react'
import { useJsonData } from '../Features/api';
import "../../node_modules/video-react/dist/video-react.css";

export function Lecteur() {

    const { jsonData, loading, error } = useJsonData();

    const videoSrc = "/film.mp4"//https://archive.org/download/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"

    const [activeButtonId, setActiveButtonId] = useState(null);

    const handleButtonClick = (id) => {
        setActiveButtonId(id); // Met à jour le bouton actif
      };


    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            {jsonData.Chapters.map((chapter) =>(
                <Button
                    variant={activeButtonId === chapter.pos ? "contained" : "outlined"}
                    onClick={() => handleButtonClick(chapter.pos)}>
                        {chapter.title}
                </Button>
            ))}

            <Player
            playsInline
            poster="/poster.png"
            src={videoSrc}
            aspectRatio='auto'>
                <BigPlayButton position="center" />
            </Player>
        </div>
    )
}