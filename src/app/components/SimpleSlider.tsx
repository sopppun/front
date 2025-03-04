import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태 설정

  useEffect(() => {
    // 클라이언트에서만 실행되도록 useEffect 사용
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // 처음 렌더링 시 모바일 여부 판단
    handleResize();

    // 윈도우 사이즈 변경 시에도 모바일 여부 판단
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000, // 4초마다 자동으로 넘어감
    fade: true, // 이미지가 서서히 나타나도록 설정
    responsive: [
      {
        breakpoint: 1024, // 화면 너비가 1024px 이하일 때
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="w-full h-[700px] flex items-center">
          {!isMobile ? ( // 모바일이 아닐 때
            <>
              <div className="w-full h-[700px]">
                <div className="flex">
                  <div className="w-[35%] h-[700px] bg-red-950 text-white">
                    <img
                      src="/images/image1.jpg"
                      alt="Image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[30%] h-[700px] text-black flex flex-col items-center justify-center text-center">
                    <h1 className="text-5xl font-bold">쇼핑몰!</h1>
                    <p className="text-lg mt-4 mb-6">
                      쇼핑몰을 소개합니다. 다양한 스타일과 품질 좋은 상품을
                      만나보세요.
                    </p>
                    <button className="bg-black text-white font-semibold py-2 mt-16 px-11 rounded hover:text-black hover:bg-white">
                      More
                    </button>
                  </div>
                  <div className="w-[35%] h-[700px] bg-blue-950 text-white">
                    <img
                      src="/images/image2.jpg"
                      alt="Image 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            // 모바일일 때
            <div className="w-full h-[700px] bg-red-950 text-white">
              <img
                src="/images/image1.jpg"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div>
          <div className="w-full h-[700px] bg-red-700 text-white">
            <img
              src="/images/image3.jpg"
              alt="Image 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="w-full h-[700px] bg-sky-700 text-white">
            <img
              src="/images/image4.jpg"
              alt="Image 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
