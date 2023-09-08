import "./MovieCard.css";
import { Link } from "react-router-dom";
import star from "../../assets/images/star.png";
import { useGlobalContext } from "../../context";

function MovieCard(props) {
  const { genres } = useGlobalContext();

  const filteredgenre = genres.filter((genre) =>
    props.genre.find((e) => e === genre.id)
  );
  //console.log(filteredgenre);

  var starArr = [];
  for (let i = 0; i < props.rating / 2; i++) {
    starArr.push(<img src={star} key={i} alt="star" />);
  }

  return (
    <Link to={`movie-details/${props.id}`}>
      <div className="movie-card">
        <div className="movie-img">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.img}`}
            alt={props.alt}
          />
        </div>
        <div className="title">{props.title}</div>
        <div className="rating">{starArr}</div>
        <div className="genre-container">
          {filteredgenre.map((genre, index) => {
            return (
              <div className="genre" key={index}>
                {genre.name}
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
