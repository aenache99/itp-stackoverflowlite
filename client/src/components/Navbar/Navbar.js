// Libraries
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

// Assets
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import bars from "../../assets/bars-solid.svg";

// Components & Styles
import "./Navbar.css";

// Actions
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = ({ handleSlideIn }) => {
    const dispatch = useDispatch();
    const { token, result } = useSelector((state) => state.currentUserReducer) || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setCurrentUser(null));
    };

    const renderUserActions = () => (
        result ? (
            <>
                <Link to={`/Users/${result._id}`} className="nav-item nav-links">Profile</Link>
                <button className="nav-item nav-links" onClick={handleLogout}>
                    Log out
                </button>
            </>
        ) : (
            <Link to="/Auth" className="nav-item nav-links">Log in</Link>
        )
    );

    useEffect(() => {
        const handleLogout = () => {
            dispatch({ type: "LOGOUT" });
            navigate("/");
            dispatch(setCurrentUser(null));
        };

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [token, dispatch, navigate]);


    return (
        <nav className="main-nav">
            <section className="navbar">
                <button className="slide-in-icon" onClick={handleSlideIn}>
                    <img src={bars} alt="menu icon" width="15" />
                </button>
                <section className="navbar-1">
                    <Link to="/" className="nav-item nav-logo">
                        <img src={logo} alt="company logo" />
                    </Link>
                    <Link to="https://github.com/aenache99/itp-stackoverflowlite" className="nav-item nav-links">About the Project</Link>
                    <Link to="https://github.com/aenache99" className="nav-item nav-links">Author's GitHub</Link>
                    <Link to="https://www.inthepocket.com/" className="nav-item nav-links">Company</Link>
                    <Link to="https://www.inthepocket.com/careers" className="nav-item nav-links">Jobs</Link>
                    <form className="search-form">
                        <input type="text" placeholder="Search..." />
                        <img src={search} alt="search icon" width="18" className="search-icon" />
                    </form>
                </section>
                <section className="navbar-2">
                    {renderUserActions()}
                </section>
            </section>
        </nav>
    );
};

export default Navbar;
