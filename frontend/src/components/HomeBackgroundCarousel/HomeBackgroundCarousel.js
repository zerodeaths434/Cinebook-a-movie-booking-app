import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./HomeBackgroundCarousel.css";
import images from "./Carousel-Images-Desktop";
import phone_images from "./Carousel-Images-Phone";

function HomeBackgroundCarousel() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleScreenWidth = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth, false);
  }, [screenSize]);

  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Slider {...settings} className="slider">
      {screenSize > 800
        ? images.map((image) => {
            return (
              <div className="img-container" key={image.id}>
                <div className="overlay"></div>
                <img key={image.id} src={image.img} alt={image.alt} />
              </div>
            );
          })
        : phone_images.map((image) => {
            return (
              <div className="img-container" key={image.id}>
                <div className="overlay"></div>
                <img key={image.id} src={image.img} alt={image.alt} />
              </div>
            );
          })}
    </Slider>
  );
}

export default HomeBackgroundCarousel;
