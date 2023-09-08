import MovieCarousel from "../../components/movie-carousel/MovieCarousel";
import Premier from "../../components/premiere/Premiere";
import HomeBackgroundCarousel from "../../components/HomeBackgroundCarousel/HomeBackgroundCarousel";
import "./home.css";

function Home() {
  return (
    <>
      <div className="background-movie-carousel showBgCarousel">
        <HomeBackgroundCarousel />
      </div>
      <div className="movie-carousel-container ">
        <h1>New Releases</h1>
        <MovieCarousel />
      </div>
      <Premier />
    </>
  );
}

export default Home;
