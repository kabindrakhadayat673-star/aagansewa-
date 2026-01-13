import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-20 font-sans">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <span className="text-white font-black text-xl">AS</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">
              AGAN<span className="text-orange-500">SEWA</span>
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-gray-400 font-normal">
            AganSewa is Nepal’s digital fire safety service platform providing
            inspection, licensing, emergency support, and safety training
            nationwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
            Quick Links
          </h4>
          <ul className="space-y-3 text-[14px]">
            {[
              { name: "Home", path: "/home" },
              { name: "Services", path: "/services" },
              { name: "Branches", path: "/branches" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className="hover:text-orange-500 hover:translate-x-1 transition-all duration-300 inline-block text-gray-400"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
            Our Services
          </h4>
          <ul className="space-y-3 text-[14px] text-gray-400">
            <li className="hover:text-gray-200 transition-colors cursor-default">
              Fire Inspection
            </li>
            <li className="hover:text-gray-200 transition-colors cursor-default">
              Fire License
            </li>
            <li className="hover:text-gray-200 transition-colors cursor-default">
              Safety Training
            </li>
            <li className="hover:text-gray-200 transition-colors cursor-default">
              Emergency Response
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
            Contact Us
          </h4>
          <ul className="space-y-4 text-[14px] text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-500 mt-1 shrink-0" />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-500 shrink-0" />
              <span>+977-1-1234567</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500 shrink-0" />
              <span className="break-all">info@agansewa.gov.np</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-orange-500 text-gray-300 hover:text-white transition-all duration-300 shadow-lg"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-500 tracking-wide">
          <p>© {new Date().getFullYear()} AganSewa • Government of Nepal</p>
          <p className="font-medium text-gray-600">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;