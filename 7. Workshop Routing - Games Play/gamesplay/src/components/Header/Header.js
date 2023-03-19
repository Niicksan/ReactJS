import { Link } from 'react-router-dom';
import header from "./Header.module.css";

export const Header = () => {
    return (
        <header>
            <h1><Link className={header.home} to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to="/create-game">Create Game</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
};