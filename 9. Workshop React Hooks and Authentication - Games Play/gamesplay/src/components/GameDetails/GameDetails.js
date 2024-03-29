import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { gameServiceFactory } from '../../services/gameService';
import { AuthContext } from '../../contexts/AuthContext';
import { useService } from '../../hooks/useService';

export const GameDetails = ({ games,
    setGames
}) => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const [game, setGame] = useState({});

    const gameService = useService(gameServiceFactory)
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getGameById(gameId)
            .then(result => {
                setGame(result);
            })
    }, [gameId]);

    const isAuth = userId ? true : false;
    const isOwner = game._ownerId === userId;
    const hasComments = game.comments !== undefined ? true : false;

    const onGameDeleteClick = async () => {
        await gameService.deleteGame(game._id);

        setGames(state => state.filter(x => x._id !== game._id));

        navigate('/catalog');
    };

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await gameService.addComment(gameId, {
            username,
            comment,
        });

        setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
        setUsername('');
        setComment('');
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
                        {game.comments && Object.values(game.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
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
            {(isAuth && !isOwner) && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onCommentSubmit}>
                        <input type="text" name="username" placeholder='Пешо' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}
        </section>
    );
};