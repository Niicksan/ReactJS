import { Link } from 'react-router-dom';
import header from "./Header.module.css";

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className={header.home} to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {/* <!-- Logged-in users --> */}
                {isAuthenticated && (
                    <div id="user">
                        <Link to="/create-game">Create Game</Link>
                        <span>{userEmail}</span>
                        <Link to="/logout">Logout</Link>
                    </div>
                )}

                {/* <!-- Guest users --> */}
                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};