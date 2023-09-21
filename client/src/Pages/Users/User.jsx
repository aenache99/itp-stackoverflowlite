import React from "react";
import { Link } from "react-router-dom";

import "./Users.css";

const User = ({ user }) => {
    return (
        <Link to={`/Users/${user._id}`} className="user-profile-link">
            <div className="user-avatar">
                <h3>{user.name.charAt(0).toUpperCase()}</h3>
            </div>
            <div className="user-info">
                <h5>{user.name}</h5>
                <span>{user.reputation || 0} Rep</span>
            </div>
        </Link>
    );
};

export default User;
