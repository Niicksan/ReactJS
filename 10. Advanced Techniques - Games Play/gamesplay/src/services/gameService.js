import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/games';

export const gameServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllGames = async () => {
        const result = await request.get(baseUrl);
        const games = Object.values(result);

        return games;
    };

    const getGameById = async (gameId) => {
        const result = await request.get(`${baseUrl}/${gameId}`);

        return result;
    };

    const createGame = async (gameData) => {
        const result = await request.post(baseUrl, gameData);

        console.log(result);

        return result;
    };

    const editGame = (gameId, data) => request.put(`${baseUrl}/${gameId}`, data);

    const deleteGame = (gameId) => request.delete(`${baseUrl}/${gameId}`);

    return {
        getAllGames,
        getGameById,
        createGame,
        editGame,
        deleteGame
    };
}