import PremiereMovieCard from "../card/PremiereMovieCard";
import "./Premiere.css";
import { useGlobalContext } from "../../context";

function Premier() {
  const { premiereMovies } = useGlobalContext();
  return (
    <>
      <section className="premiere">
        <div className="premiere-title">
          <h1>Upcoming Movies</h1>
        </div>
        <div className="premiere-movies">
          {premiereMovies.map((movie) => {
            return (
              <PremiereMovieCard
                key={movie.id}
                id={movie.id}
                img={movie.poster_path}
                title={movie.original_title}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Premier;
