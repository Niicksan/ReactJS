import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { gameServiceFactory } from './services/gameService';
import { AuthProvider } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { CreateGame } from './components/CreateGame/CreateGame';
import { EditGame } from './components/EditGame/EditGame';
import { GameDetails } from './components/GameDetails/GameDetails';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const gameService = gameServiceFactory();

    useEffect(() => {
        gameService.getAllGames()
            .then(result => {
                setGames(result);
            })
    }, []);

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

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog games={games} />} />
                        <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
                        <Route path='/catalog/:gameId' element={<GameDetails setGames={setGames} />} />
                        <Route path='/catalog/:gameId/edit' element={<EditGame onEditGameSubmit={onEditGameSubmit} />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
};

export default App;
