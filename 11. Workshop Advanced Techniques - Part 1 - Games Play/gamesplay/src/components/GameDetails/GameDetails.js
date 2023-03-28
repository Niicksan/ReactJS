import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';

import { gameServiceFactory } from '../../services/gameService';
import * as commentService from '../../services/commentService';
import { useAuthContext } from '../../contexts/AuthContext';
import { gameReducer } from '../../reducers/gameReducer';
import { useService } from '../../hooks/useService';
import { AddComment } from './AddComment/AddComment';

export const GameDetails = () => {
    const { gameId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const { deleteGame } = useGameContext();
    const [game, dispatch] = useReducer(gameReducer, {});

    const gameService = useService(gameServiceFactory)
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            gameService.getGameById(gameId),
            commentService.getAll(gameId)
        ]).then(([gameData, comments]) => {
            const gameState = {
                ...gameData,
                comments,
            };

            dispatch({ type: 'GAME_FETCH', payload: gameState })
        })
    }, [gameId, gameService]);

    const isOwner = game._ownerId === userId;
    const hasComments = game.comments?.length !== 0 ? true : false;

    const onGameDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete ${game.title}`);
        if (result) {
            await gameService.deleteGame(game._id);

            deleteGame(game._id);

            navigate('/catalog');
        }
    };

    const onCommentSubmit = async (values) => {
        const response = await commentService.addComment(gameId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail,
        });
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    {!hasComments && (
                        <p className="no-comment">No comments.</p>
                    )}

                    <ul>
                        {game.comments && game.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author?.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onGameDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {(isAuthenticated && !isOwner) && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};