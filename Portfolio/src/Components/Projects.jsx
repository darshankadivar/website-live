import React, { useEffect } from "react";
import AOS from "aos";

const Projects = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const projects = [
        {
            title: "Clothing Inventory",
            description: "A sleek personal portfolio built with React, Tailwind CSS, and animations.",
            img: "clothing.png",
            skills: ["React", "Tailwind CSS", "AOS"],
            link: "https://clothing-gray.vercel.app/",
        },
        {
            title: "Wrogn",
            description: "A modern e-commerce platform with cart, filters, and smooth UI.",
            img: "wrogn.png",
            skills: ["React", "Tailwind CSS", "AOS"],
            link: "https://wrogn.vercel.app/",
        },
        {
            title: "Gucci",
            description: "Real-time weather tracking with API integration and location search.",
            img: "gucci.png",
            skills: ["React", "Tailwind CSS", "AOS"],
            link: "https://majestic-starlight-2b8fcd.netlify.app/",
        },
    ];

    return (
        <section
            id="projects"
            className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-16"
        >
            {/* Stylish Heading */}
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-4xl md:text-5xl font-extrabold inline-block relative">
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        My Projects
                    </span>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full shadow-lg"></span>
                </h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                    Some of my best works — blending creativity, performance, and user experience.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                        className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-500"
                    >
                        {/* Project Image */}
                        <div className="overflow-hidden">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>

                                {/* Skills Badges */}
                                <div className="flex flex-wrap gap-2">
                                    {project.skills?.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Button */}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                            >
                                View Project
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
