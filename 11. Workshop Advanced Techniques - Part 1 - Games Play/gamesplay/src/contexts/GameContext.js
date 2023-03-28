import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameServiceFactory } from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const gameService = gameServiceFactory();

    useEffect(() => {
        gameService.getAllGames()
            .then(result => {
                setGames(result);
            })
    }, [gameService]);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.createGame(data);

        setGames(state => [...state, newGame]);

        navigate('/catalog');
    };

    const onEditGameSubmit = async (values) => {
        const result = await gameService.editGame(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
    };

    const deleteGame = (gameId) => {
        setGames(state => state.filter(game => game._id !== gameId));
    };

    const getGameById = (gameId) => {
        return games.find(game => game._id === gameId);
    };

    const contextValues = {
        games,
        onCreateGameSubmit,
        onEditGameSubmit,
        deleteGame,
        getGameById,
    };

    return (
        <GameContext.Provider value={contextValues}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
};