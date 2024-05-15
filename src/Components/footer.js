import React from "react"
import MP3Player from "./MP3Player";
import '../CSS/footer.css'


export default function footer() {
    return (
        <div class = "footerContainer">
            <p class = "footerContent">Made with <img src="/heart.webp" alt = "heartLogo" class = "heart" /> by Randolph</p>
            <MP3Player url = "/ocean.mp3" />
        </div>
    );
}