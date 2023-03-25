import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { gameServiceFactory } from './services/gameService';
import { authServiceFactory } from './services/authService';
import { AuthContext } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { CreateGame } from './components/CreateGame/CreateGame';
import { GameDetails } from './components/GameDetails/GameDetails';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { EditGame } from './components/EditGame/EditGame';

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});
    const gameService = gameServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken)

    useEffect(() => {
        gameService.getAllGames()
            .then(result => {
                setGames(result);
            })
    }, []);

    const onLoginSubmit = async (loginFormData) => {
        try {
            const user = await authService.login(loginFormData);

            setAuth(user);
            navigate('/catalog');
        } catch (error) {
            console.log('Please check your email or password');
        }
    }

    const onRegisterSubmit = async (registerFormData) => {
        const { confirmPassword, ...registerData } = registerFormData

        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const user = await authService.register(registerData);

            setAuth(user);

            navigate('/catalog');
        } catch (error) {
            console.log('There is a problem');
        }
    }

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };


    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.createGame(data);

        setGames(state => [...state, newGame]);

        navigate('/catalog');
    };

    const onEditGameSubmit = async (values) => {
        const result = await gameService.editGame(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        setGames,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog games={games} />} />
                        <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
                        <Route path='/catalog/:gameId' element={<GameDetails games={games} setGames={setGames} />} />
                        <Route path='/catalog/:gameId/edit' element={<EditGame onEditGameSubmit={onEditGameSubmit} />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
};

export default App;
