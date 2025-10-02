import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User } from "lucide-react";

export default function Navbar({ setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/products", label: "Products" },
    { path: "/orders", label: "Orders" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700  dark:from-gray-900 dark:to-gray-800 text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold tracking-wide">Admin Panel</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "bg-white text-blue-600 dark:bg-gray-700 dark:text-white shadow"
                    : "hover:bg-blue-500 dark:hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold shadow hover:opacity-90"
              >
                <User size={20} />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Dark Mode Button in Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                location.pathname === link.path
                  ? "bg-white text-blue-600 dark:bg-gray-700 dark:text-white shadow"
                  : "hover:bg-blue-500 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold shadow mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
