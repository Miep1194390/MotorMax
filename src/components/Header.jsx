import React from "react";
import "../css/App.scss";
import logo from "../img/logo2.png";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header_logo">
                <Link to="/"><img src={logo} alt="MotoMax Logo" /></Link>
            </div>
            <div className="header_login">
                <Link to="/hoewerkthet">Hoe werkt het?</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/login">Login</Link>
            </div>
        </header>
    );  
}
    
export default Header;