import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const educationData = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Saurastra University",
      year: "2020 - 2023",
      details: "Specialized in Web Development and Full Stack projects.",
    },
    {
      degree: "Higher Secondary (Science)",
      school: "Takshshila School",
      year: "2018 - 2020",
      details: "Completed with Physics, Chemistry, and Biology.",
    },
    {
      degree: "Secondary School",
      school: "Takshshila School",
      year: "2017 - 2018",
      details: "Focus on foundational subjects and early coding exposure.",
    },
  ];

  return (
    <section
      id="education"
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-16"
    >
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Education
        </h2>
        <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          A journey of continuous learning and academic achievements.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line (hide on mobile) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-700"></div>

        {educationData.map((edu, index) => (
          <div
            key={index}
            className={`mb-12 flex flex-col md:flex-row items-center md:justify-between w-full ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
            data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
          >
            {/* Content */}
            <div className="w-full md:w-5/12 bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaGraduationCap className="text-cyan-400" /> {edu.degree}
              </h3>
              <p className="text-gray-300 text-sm mt-1">{edu.school}</p>
              <p className="text-gray-400 text-sm italic">{edu.year}</p>
              <p className="mt-3 text-gray-200 text-sm leading-relaxed">
                {edu.details}
              </p>
            </div>

            {/* Circle (center on desktop, top on mobile) */}
            <div className="hidden md:flex rounded-full bg-cyan-400 w-6 h-6 flex-shrink-0 shadow-lg"></div>

            {/* Empty space for alignment (desktop only) */}
            <div className="hidden md:block w-5/12"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
