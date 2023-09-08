import "./MovieCard.css";
import { Link } from "react-router-dom";

function PremiereMovieCard(props) {
  return (
    <Link to={`movie-details/${props.id}`}>
      <div className="Premiere-movie-card">
        <div className="movie-img">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.img}`}
            alt="anything"
          />
        </div>
        <div className="title">{props.title}</div>
      </div>
    </Link>
  );
}

export default PremiereMovieCard;
