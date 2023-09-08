import "./MovieDetails.css";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";
import CastCard from "../../components/cast-card/CastCard";

function MovieDetails() {
  const { id } = useParams();

  const { moviesArr, premiereMovies } = useGlobalContext();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isButtonDisabled, disableButton] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5e076fda2c2147597642fd3a261ad883&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCrew(data.crew);
        setCast(data.cast.slice(0, 10));
      });
  }, [id]);

  const movie =
    moviesArr.find((movie) => movie.id.toString() === id) ||
    premiereMovies.find((movie) => movie.id.toString() === id);
  const director = crew.find((c) => c.job === "Director");

  useEffect(() => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    if (movie) {
      const movie_release_day = parseInt(movie.release_date.substring(8, 11));
      const movie_release_month = parseInt(movie.release_date.substring(5, 7));
      if (movie_release_month > mm) {
        disableButton(true);
      } else if (mm === movie_release_month && movie_release_day > dd) {
        disableButton(true);
      }
    }
  }, [movie]);

  console.log(movie);

  return (
    <>
      <section className="movie-details-section">
        {movie && (
          <img
            className="backdrop_img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="backdrop"
          />
        )}
        <div className="Imgoverlay"></div>
        {movie && (
          <div className="movie-details-container">
            <div className="movie-details-img-container">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="poster"
              />
            </div>
            <div className="about-movie">
              <div className="movie-title">{movie.original_title}</div>
              <div className="genre-box">Thriller Action</div>
              <div className="story">Story</div>
              <p>{movie.overview}</p>
              <div className="details">Details</div>
              <div>Release year: {movie.release_date}</div>
              <div>IMdb rating: {movie.vote_average}</div>
              <div>
                Spoken language: {movie.original_language.toUpperCase()}
              </div>
              <div className="book-ticket-container">
                <Link to={`/book-tickets/${movie.original_title}`}>
                  <button className="book-tickets" disabled={isButtonDisabled}>
                    Book Tickets
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="cast-Div">
        <h1>Cast</h1>
        <div className="castContainer">
          {cast.map((cast, index) => {
            return (
              <CastCard
                key={index}
                img={cast.profile_path}
                actor_name={cast.name}
                character={cast.character}
              />
            );
          })}
        </div>
        <h1>Director</h1>
        <div className="castContainer">
          {director && (
            <CastCard img={director.profile_path} actor_name={director.name} />
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
