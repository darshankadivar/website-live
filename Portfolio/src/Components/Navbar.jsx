import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const navLinks = ["Home", "Skill", "Education", "Projects", "Contact"];

  return (
    <div className="h-16 text-white">
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-50 
        backdrop-blur-md bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] 
        bg-opacity-90 border-b border-white/10 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-3xl font-extrabold tracking-wide 
            bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 
            bg-clip-text text-transparent"
          >
            My<span className="text-white">Portfolio</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <li key={item} className="group relative">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-lg font-medium transition duration-300"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                    bg-gradient-to-r from-emerald-400 to-lime-300 
                    transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu (Pro Style) */}
        <div
          className={`fixed top-0 left-0 h-screen w-full 
          bg-gradient-to-b from-[#0f2027]/95 via-[#203a43]/95 to-[#2c5364]/95 
          backdrop-blur-lg transform transition-transform duration-500 ease-in-out z-40 
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
            <h1
              className="text-2xl font-extrabold tracking-wide 
              bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 
              bg-clip-text text-transparent"
            >
              My<span className="text-white">Portfolio</span>
            </h1>
            <button
              className="text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="flex flex-col items-center justify-center h-[80%] space-y-8">
            {navLinks.map((item, index) => (
              <li
                key={item}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-semibold tracking-wide text-white transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                    bg-gradient-to-r from-pink-500 to-purple-500 
                    transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
