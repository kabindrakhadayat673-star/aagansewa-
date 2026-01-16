import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Branches", path: "/branches" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-lg">
            <span className="text-orange-500 font-black text-xl">AS</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter">
            <span className="text-orange-500">AGANSEWA</span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[15px] font-medium text-gray-300">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative transition-colors hover:text-orange-500 ${
                    isActive ? "text-orange-500 after:w-full" : "after:w-0"
                  } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-4 border-l border-gray-700 pl-6">
            <a
              href="tel:101"
              className="text-gray-300 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"
            >
              <FaPhoneAlt className="text-orange-500 animate-pulse" /> 101
            </a>
            <NavLink
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Portal Login
            </NavLink>
          </div>
        </div>

        <div
          className="md:hidden text-white cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-[#0f172a] border-t border-gray-800 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 text-lg font-medium hover:text-orange-500"
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-orange-500 text-white w-full py-4 rounded-xl font-bold mt-4 text-center"
          >
            Portal Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;