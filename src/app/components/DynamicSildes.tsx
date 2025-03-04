import React, { useState } from "react";
import Slider from "react-slick";

function DynamicSlides() {
  const [slides, setSlides] = useState([
    "제품",
    "제품",
    "제품",
    "제품",
    "제품",
    "제품",
  ]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide) => {
          return (
            <div
              key={slide}
              className="flex justify-center items-center text-center"
            >
              <h3 className="w-[300px] h-[300px] bg-black text-white flex justify-center items-center">
                {slide}
              </h3>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default DynamicSlides;
