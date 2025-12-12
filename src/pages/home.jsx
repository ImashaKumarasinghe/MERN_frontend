import Header from '../components/header';
import { useState, useEffect } from "react";

function HomePage() {
  const images = [
    "bg2.jpg",
    "bg20.jpg",
    "bg11.jpg"
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full min-h-screen flex flex-col font-[Poppins]">
      <Header />

      {/* -------- SLIDESHOW -------- */}
      <div className="relative w-full h-[75vh] overflow-hidden rounded-b-3xl shadow-xl">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Slide"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow hover:bg-white"
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow hover:bg-white"
        >
          ❯
        </button>

        {/* DOT INDICATORS */}
        <div className="absolute bottom-4 w-full flex justify-center gap-3">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === i ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>

        {/* Optional overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center px-6">
          <h1 className="text-5xl md:text-6xl text-white font-[Playfair] font-bold drop-shadow-lg tracking-wide mb-4">
            Welcome to <span className="text-secondary">ISH Cosmetics</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl font-[Poppins] drop-shadow-md">
            Browse our amazing collection of products and discover beauty essentials designed 
            to empower your confidence. Click on <b>"Products"</b> in the menu to explore!
          </p>
        </div>
      </div>

      {/* -------- WELCOME SECTION -------- */}
      <div className="w-full px-6 md:px-20 py-16 flex flex-col items-center text-center">
        <h2 className="text-4xl font-[Playfair] font-bold text-primary mb-6">
          Welcome
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl font-[Poppins]">
          We are delighted to have you here! Explore our curated collection of skincare and cosmetics, 
          crafted with passion and care to enhance your natural beauty and confidence.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
