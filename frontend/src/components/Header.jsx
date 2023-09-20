import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {

    const { userId, signout } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link to="/">
                    <img src="/logo-stackoverflow.png" alt="Stack Overflow" style={{ height: '40px', width: 'auto' }} />
                </Link>
            </h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {
                        userId ? <li><Link to="/signin" className='button' onClick={signout}>Sign Out</Link></li>
                            :
                            <li><Link to="/signin" className='button'>Sign In</Link></li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;