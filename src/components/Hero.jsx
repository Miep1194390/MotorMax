import React from "react";
import "../css/App.scss";
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-container_item">
                <h1>Welkom bij MotorMax</h1>
                <p>De beste motor meet app van Nederland.</p>
                <Link to="/feed">Bekijk meeting feed</Link>
            </div>
        </div>
    );
}

export default Hero;
