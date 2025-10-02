import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHtml5, FaCss3Alt, FaReact, FaJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" />, aos: "zoom-in" },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" />, aos: "zoom-in" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" />, aos: "zoom-in" },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, aos: "zoom-in" },
    { name: "React", icon: <FaReact className="text-cyan-300" />, aos: "zoom-in" },
  ];

  return (
    <section
      id="skill"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-16"
    >
      {/* Heading */}
      <div className="text-center mb-16 mt-18" data-aos="fade-down">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Skills
        </h2>
        <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          Technologies I specialize in to craft modern, sleek, and high-performance websites.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            data-aos={skill.aos}
            data-aos-delay={index * 100}
            className="relative group p-6 rounded-2xl 
                       bg-white/10 backdrop-blur-xl border border-white/20
                       shadow-lg transition-all duration-500 ease-out
                       hover:scale-110 hover:shadow-emerald-400/40
                       cursor-pointer overflow-hidden"
          >
            {/* Gradient Border Glow */}
            <div className="absolute inset-0  rounded-2xl border-2 border-transparent group-hover:border-emerald-400 transition-all duration-500"></div>

            {/* Icon */}
            <div className="text-6xl flex justify-center items-center mb-4 transition-transform duration-500 group-hover:rotate-360">
              {skill.icon}
            </div>

            {/* Name */}
            <p className="mt-2 font-semibold text-center text-lg tracking-wide">
              {skill.name}
            </p>

            {/* Hover Background Light Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-400/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
