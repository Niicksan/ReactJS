import { Link } from "react-router-dom";

export const CatalogItem = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={imageUrl} />
                <h2>{title}</h2>
                <h6>{category}</h6>
                <Link to={`/catalog/${_id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
}