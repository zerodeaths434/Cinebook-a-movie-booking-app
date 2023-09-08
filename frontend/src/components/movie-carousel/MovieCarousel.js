import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieCard from "../card/MovieCard";
import { useGlobalContext } from "../../context";

function MovieCarousel() {
  const { moviesArr } = useGlobalContext();
  const [noOfSlides, setNoOfSlides] = useState(1);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [setttings, setSettings] = useState({});

  const handleScreenWidth = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth, false);
    if (window.innerWidth > 1650) {
      setNoOfSlides(4);
    } else if (window.innerWidth > 1270) {
      setNoOfSlides(3);
    } else if (window.innerWidth > 850) {
      setNoOfSlides(2);
    } else {
      setNoOfSlides(1);
    }
  }, [screenSize]);

  useEffect(() => {
    setSettings({
      dots: true,
      autoplay: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: noOfSlides,
      slidesToScroll: 1,
    });
  }, [noOfSlides]);

  return (
    <Slider {...setttings}>
      {moviesArr.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            img={movie.poster_path}
            title={movie.original_title}
            rating={movie.vote_average}
            genre={movie.genre_ids}
          />
        );
      })}
    </Slider>
  );
}

export default MovieCarousel;
