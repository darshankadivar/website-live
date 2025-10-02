import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white px-4 sm:px-8 md:px-16 lg:px-24 py-10"
    >
      {/* Left Content */}
      <div
        className="flex-1 space-y-6 text-center md:text-left"
        data-aos="fade-right"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hi, I’m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
            <Typewriter
              words={["Darshan", "Web Developer", "React Enthusiast"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
          I’m a passionate developer who loves building modern and responsive
          websites with clean design and smooth animations.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a
            href="#projects"
            className="px-5 py-3 bg-gradient-to-r from-emerald-400 to-lime-300 text-black font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-sm sm:text-base"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-3 border border-emerald-400 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-400 hover:text-black transition duration-300 text-sm sm:text-base"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div
        className="flex-1 flex justify-center mt-10 md:mt-0"
        data-aos="fade-left"
      >
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
          {/* Rotating Border */}
          <div
            className="absolute inset-0 rounded-full p-[6px] animate-spinBorder"
            style={{
              background:
                "conic-gradient(#ff007f, #ffdd00, #00ffcc, #007bff, #ff007f)",
              boxShadow:
                "0 0 20px #ff007f, 0 0 30px #00ffcc, 0 0 40px #007bff"
            }}
          >
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>

          {/* Static Image */}
          <div className="absolute inset-[8px] rounded-full overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/3d-rendering-cartoon-boy_23-2150797600.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
