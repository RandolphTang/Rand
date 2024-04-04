import './component.css'
import React, { useState} from "react";
import Cube from "./cube";

export default function LogoBackground() {

    const [shrink, setShrink] = useState(false);
    const [showCube, setShowCube] = useState(false);
    const [gone, setGone] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);


    const handleMouseToggle = (event) => {

        clearTimeout(timeoutId);
      

        if (event.type === 'mousedown') {
            console.log('first one?');
            setShrink(true);

            const newTimeoutId = setTimeout(() => {
                console.log('settimeout?');
                setShowCube(true);
                setShrink(false);
                setGone(true);
            }, 2300);

            setTimeoutId(newTimeoutId);

        } else if (event.type === 'mouseup') {
            console.log('second one?');

            clearTimeout(timeoutId);
            setShrink(false);

           
            
        } else if (event.type === 'mouseenter') {
            console.log('third one?');

        } else if (event.type === 'mouseleave') {

            console.log('fourth one?');
           
            clearTimeout(timeoutId);
            setShrink(false);

           
         
        }
    };

    return (
        <div className = {`white-logo-background ${shrink ? 'shrink' : ''} ${gone? 'gone' : ''}`}
                            onMouseDown={handleMouseToggle}
                            onMouseUp={handleMouseToggle}
                            onMouseEnter={handleMouseToggle}
                            onMouseLeave={handleMouseToggle}>

            
            
            {showCube && <Cube />}
            
            <img src="/herb.png" alt = "herbLogo" className='herb' />
        
            <img src="/wave.png" alt = "waveAnimation" class = "wave" />

            
            </div>
        
        
    );
}

