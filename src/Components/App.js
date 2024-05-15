import '../CSS/App.css';
import React from "react";
import ReactDOM from 'react-dom';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Display from "./Display";
import Footer from './footer';

function App() {

    return (
        <div>
            <img src="/cloud.png" alt="windAnimation" className="wind"/>
            <img src="/cloud.png" alt="windAnimation2" className="wind2"/>
            <img src="/cloud.png" alt="windAnimation2" className="wind3"/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/Display" element={<Display/>}/>
            </Routes>
            <Footer/>
        </div>
    );

}

export default App;
