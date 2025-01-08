import { Player, BigPlayButton } from 'video-react'
import "../../node_modules/video-react/dist/video-react.css";

export function Lecteur() {
    const videoSrc = "/film.mp4"//https://archive.org/download/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"

    return (
        <Player
        playsInline
        poster="/poster.png"
        src={videoSrc}
        aspectRatio='auto'>
            <BigPlayButton position="center" />
        </Player>
    )
}