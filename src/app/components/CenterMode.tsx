import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 100, // 전환 속도를 조정 (부드럽게)
    autoplaySpeed: 5000, // 자동 재생 속도
    cssEase: "ease", // 부드러운 전환
    swipe: true, // 스와이프 기능 활성화
    touchMove: true, // 터치 이동 활성화
    draggable: true, // 드래그 가능 설정
    responsive: [
      {
        breakpoint: 1024, // 화면 너비가 1024px 이하일 때
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // 화면 너비가 600px 이하일 때
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          speed: 500, // 이 부분도 조정 가능
          autoplaySpeed: 0,
        },
      },
      {
        breakpoint: 480, // 화면 너비가 480px 이하일 때
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image9.jpg",
    "/images/image10.jpg",
    "/images/image11.jpg",
    "/images/image12.jpg",
  ];

  return (
    <div className="slider-container mt-[50px] mb-[50px]">
      <h2
        className="font-extrabold text-center
       text-3xl mb-12"
      >
        BEST
      </h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-4">
            <div className="w-full h-[400px] ">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
