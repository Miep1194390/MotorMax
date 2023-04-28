import React from "react";
import "../css/App.scss";
import logo from "../img/logo2.png";

const Header = () => {
    return (
        <div>
            <div className="header-container d-flex justify-content-center">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="login"></div>
            </div>
        </div>
    );  
}
    
export default Header;