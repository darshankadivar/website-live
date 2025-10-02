import React, { useEffect, useState } from "react";
import AOS from "aos";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {toast, Toaster} from "react-hot-toast";


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    // Success toast
    toast.success("Your message has been sent!", {
      position: "top-right",
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #06b6d4",
        padding: "12px",
        borderRadius: "8px",
      },
      iconTheme: {
        primary: "#06b6d4",
        secondary: "#fff",
      },
    });

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };


  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-16"
    >
        <Toaster/>
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Contact Me
        </h2>
        <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          Let’s work together! Fill out the form or reach me through my social channels.
        </p>
      </div>

      {/* Contact Layout */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Info */}
        <div className="space-y-6" data-aos="fade-right">
          <h3 className="text-2xl font-semibold">Let’s Connect</h3>
          <p className="text-gray-400">
            Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-cyan-400 text-xl" />
              <span>darshankadivar@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-cyan-400 text-xl" />
              <span>+91 9510086340</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/darshankadivar"
              className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-cyan-500 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kadivar-darshan-559032230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="p-3 bg-white/10 rounded-full border border-white/20 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          data-aos="fade-left"
          className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
