import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImg1 from "../../assets/banner (2).jpg";
import bannerImg2 from "../../assets/banner (1).jpg";
import bannerImg3 from "../../assets/banner (3).jpg";
import bannerImg4 from "../../assets/banner (4).jpg";
import bannerImg5 from "../../assets/banner (5).jpg";
import { Typewriter } from "react-simple-typewriter";
import { Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export default function SimpleSlider() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: true,
    infinite: true,
    fade: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      src: bannerImg1,
      title: "Find Your Perfect Match.",
      description: "Discover profiles tailored to your preferences.",
      buttons: ["View Profiles", "Join Now"],
    },
    {
      src: bannerImg2,
      title: "Premium Member Highlights.",
      description: "Explore premium members' detailed biodatas.",
      buttons: ["Explore Premium", "Learn More"],
    },
    {
      src: bannerImg3,
      title: "Filter and Connect Easily.",
      description: "Use advanced filters to find your ideal partner.",
      buttons: ["Start Filtering", "Connect Now"],
    },
    {
      src: bannerImg4,
      title: "Share Your Success Story.",
      description: "Celebrate your journey with Shubho Porinoy.",
      buttons: ["Submit Story", "Read Stories"],
    },
    {
      src: bannerImg5,
      title: "Join Shubho Porinoy Today.",
      description: "Start your journey to a meaningful connection.",
      buttons: ["Sign Up", "Get Started"],
    },
  ];

  return (
    <div
      className="w-[93%] container mx-auto mt-4"
      data-aos="flip-left"
      data-aos-duration="2000"
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[600px] w-full rounded-xl overflow-hidden relative"
          >
            <img
              className="h-[600px] object-cover w-full rounded-xl"
              src={slide.src}
              alt={slide.title}
            />
            <div className="absolute top-0 h-full flex flex-col justify-center items-center bg-black w-full bg-opacity-70 rounded-xl">
              <h3 className="text-4xl font-semibold text-center text-white">
                <Typewriter
                  words={[slide.title]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </h3>
              <p className="mt-4 text-lg text-center text-white">
                {slide.description}
              </p>
              <Bounce>
                <div className="flex gap-7 mt-12">
                  {slide.buttons.map((button, idx) => (
                    <Link
                      key={idx}
                      to={idx === 0 ? "/biodatas" : "/register"}
                    >
                      <button
                        className={`${
                          idx === 0
                            ? "bg-[#FEE82E] hover:bg-[#FED731]"
                            : "bg-white text-[#FE287A] hover:bg-gray-200"
                        } inline-flex items-center justify-center rounded-lg py-4 px-6 text-center text-base font-medium`}
                      >
                        {button}
                      </button>
                    </Link>
                  ))}
                </div>
              </Bounce>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
