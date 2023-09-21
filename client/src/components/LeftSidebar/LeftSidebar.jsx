// Libraries
import React from "react";
import { NavLink } from "react-router-dom";

// Assets & Styles
import Globe from "../../assets/Globe.svg";
import "./LeftSidebar.css";

const NavLinkButton = ({ to, children, extraClass = "", ...props }) => (
    <button onClick={props.handleSlideIn} className="nav-btn">
        <NavLink to={to} className={`side-nav-links ${extraClass}`} activeClassName="active">
            {children}
        </NavLink>
    </button>
);

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
    const sidebarStyle = slideIn
        ? { transform: "translateX(0%)" }
        : { transform: "translateX(-100%)" };

    return (
        <div className="left-sidebar" style={sidebarStyle}>
            <nav className="side-nav">
                <NavLinkButton to="/" handleSlideIn={handleSlideIn}>
                    <p>home</p>
                </NavLinkButton>

                <div className="side-nav-div">
                    <div>
                        <p>public</p>
                    </div>
                    <NavLinkButton to="/Questions" handleSlideIn={handleSlideIn}>
                        <img src={Globe} alt="Globe" />
                        <p className="side-nav-link-text">questions</p>
                    </NavLinkButton>
                    <NavLinkButton to="/Tags" handleSlideIn={handleSlideIn} extraClass="side-nav-link-indent">
                        <p>tags</p>
                    </NavLinkButton>
                    <NavLinkButton to="/Users" handleSlideIn={handleSlideIn} extraClass="side-nav-link-indent">
                        <p>users</p>
                    </NavLinkButton>
                </div>
            </nav>
        </div>
    );
};

export default LeftSidebar;