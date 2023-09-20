import React, { useContext, useState } from 'react';
import '../styles/Signin.css';
import { AuthContext } from '../context/AuthContext';

const Signin = () => {

    const { signin } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e) => {
        e.preventDefault();

        if (username === '' || password === '') return alert('Please enter a username and password');

        signin(username);
    }

    return (
        <div className='signin'>
            <div className='signin-container'>
                <h2>Welcome Back!</h2>
                <div className="subtitle">We're so excited to see you again!</div>
                <form onSubmit={handleSignin}>
                    <div className='form-control'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='button'>Log in</button>
                </form>
                <div className="social-login-buttons">
                    <button type="button" className='button google-login'>Log in with Google</button>
                    <button type="button" className='button github-login'>Log in with GitHub</button>
                </div>
                <div className="signup-section">
                    Don’t have an account? <a href="/signup">Sign up!</a>
                </div>
            </div>
        </div>
    )
}

export default Signin;
