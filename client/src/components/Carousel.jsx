import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tarakabataan1 from "../assets/images/tarakabataan.jpg";
import tarakabataan2 from "../assets/images/mission.jpg";
import tarakabataan3 from "../assets/images/tarakabataan3.jpg";
import tarakabataan4 from "../assets/images/tarakabataan4.jpg";
import tarakabataan5 from "../assets/images/tarakabataan6.jpg";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strandImages, setStrandImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);

  useEffect(() => {
    const imagesLink = [
      tarakabataan1,
      tarakabataan2,
      tarakabataan3,
      tarakabataan4,
      tarakabataan5,
    ];

    setStrandImages(imagesLink);
  }, []);

  useEffect(() => {
    if (strandImages.length > 0) {
      setIsLoading(false);
      if (strandImages.length === 1) {
        setAutoSlideEnabled(false);
      }
    }
  }, [strandImages]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? strandImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto slide every 5 seconds if autoSlideEnabled is true
  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === strandImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, strandImages]);

  useEffect(() => {
    if (autoSlideEnabled) {
      const interval = setInterval(() => {
        if (!isLoading) {
          nextSlide();
        }
      }, 3000); // Adjusted the auto-slide interval to 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, isLoading, autoSlideEnabled, nextSlide]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  const text =
    "Break free from ordinary: Live, learn, and connect at groundbreaking events.".split(
      " "
    );

  return (
    <div className="mx-auto bg-white dark:bg-[#273242] relative">
      <div
        className="relative"
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${strandImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100%",
          }}
          className="w-full duration-500"
        ></div>
      </div>

      {/* Left Arrow */}
      <div
        className="hover:opacity-50 absolute top-[50%] left-0 ml-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        className="hover:opacity-50 absolute top-[50%] right-0 mr-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-black/40"
        style={{
          backdropFilter: "blur(1px)", // Add blur effect to the overlay
        }}
      ></div>

      <div className="absolute top-[30%] text-center m-auto w-[100%]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="px-5 tracking-wide lg:text-5xl font-serif text-2xl font-bold text-white"
          style={{
            textShadow: "100px 100px 100px rgba(0,0,0,0.1)",
          }}
        >
          {text.map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-5">
          <Link to="/events" className=" justify-center mt-10">
            <button className="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-600 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-purple-600 hover:via-indigo-400 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              View All Events
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex absolute bottom-0 justify-center py-2 text-lg">
          {strandImages.map((_, slideIndex) => (
            <RxDotFilled
              key={slideIndex}
              className={`${
                currentIndex === slideIndex ? "text-white" : "text-gray-600"
              }`}
              active={slideIndex === currentIndex ? "true" : "false"}
              onClick={() => goToSlide(slideIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
