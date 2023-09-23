import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName("");
        setEmail("");
        setPassword("");
    };

    const isFormValid = () => {
        if (!email || !password) {
            alert("Enter email and password");
            return false;
        }
        if (isSignup && !name) {
            alert("Enter a name to continue");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        const action = isSignup ? signup : login;
        dispatch(action({ name, email, password }, navigate));
    };

    return (
        <section className="auth-section">
            {isSignup && <AboutAuth />}
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit}>
                    {isSignup && <TextInput label="Display Name" value={name} setValue={setName} />}
                    <TextInput label="Email" value={email} setValue={setEmail} />
                    <PasswordInput isSignup={isSignup} value={password} setValue={setPassword} />
                    <button type="submit" className="auth-btn">
                        {isSignup ? "Sign up" : "Log in"}
                    </button>
                </form>
                <p>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button
                        type="button"
                        className="handle-switch-btn"
                        onClick={handleSwitch}
                    >
                        {isSignup ? "Log in" : "sign up"}
                    </button>
                </p>
            </div>
        </section>
    );
};

const TextInput = ({ label, value, setValue }) => (
    <label htmlFor={label.toLowerCase()}>
        <h4>{label}</h4>
        <input
            type="text"
            id={label.toLowerCase()}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </label>
);

const PasswordInput = ({ isSignup, value, setValue }) => (
    <label htmlFor="password">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Password</h4>
            {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                    forgot password?
                </p>
            )}
        </div>
        <input
            type="password"
            id="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </label>
);

export default Auth;
