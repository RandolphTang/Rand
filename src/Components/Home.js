import '../CSS/main.css'
import '../CSS/App.css';
import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { IoMdDownload } from "react-icons/io";

export default function Home() {

    const [shrink, setShrink] = useState(false);
    const [username, setUsername] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [gone, setGone] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUsernameSubmit = () => {
        localStorage.setItem('username', username);
        setSubmitted(true);
        setTimeout(() => {
            setUsername('');
            setSubmitted(false);
        }, 300);
    };


    const handleMouseToggle = (event) => {

        clearTimeout(timeoutId);
      

        if (event.type === 'mousedown') {
            console.log('first one?');
            setShrink(true);

            const newTimeoutId = setTimeout(() => {
                console.log('settimeout?');
                setShrink(false);
                setGone(true);
                navigate('/Display');
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
        <div className="root">
            <div className="usernameContainer">
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your name"
                    className="username-input"
                />
                <button onClick={handleUsernameSubmit} className="submit-name"><IoMdDownload /></button>
            </div>
            <div className={`white-logo-background ${shrink ? 'shrink' : ''} ${gone ? 'gone' : ''}`}
                 onMouseDown={handleMouseToggle}
                 onMouseUp={handleMouseToggle}
                 onMouseEnter={handleMouseToggle}
                 onMouseLeave={handleMouseToggle}>

                <img src="/herb.png" alt="herbLogo" className='herb'/>

                <img src="/wave.png" alt="waveAnimation" className="wave"/>


            </div>

            <p className="userHint">Click thy herb for 3s!</p>
        </div>
    );
}

