import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation(); // Get current route

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Function to handle click outside of the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-gray-950 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="https://raw.githubusercontent.com/akashkumar62/labwebsite/main/gallery/logo.peg.png"
            alt="Logo"
            className="h-10 cursor-pointer ml-4 lg:ml-20"
          />
        </Link>
        <h1 className="font-mono text-xl font-bold hidden lg:block">OMSC Lab</h1>
      </div>

      {/* Menu Items */}
      <ul
        ref={menuRef}
        className={`lg:flex space-x-4 font-extralight ${menuOpen ? "block" : "hidden"} lg:block absolute lg:static top-16 right-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent text-end ml-5 lg:text-left transition-all duration-300 ease-in-out`}
      >
        {[
          { name: "Home", path: "/" },
          { name: "Dr. Saravana", path: "/about" },
          { name: "Research", path: "/research" },
          { name: "Publications", path: "/publications" },
          
          
          { name: "Team", path: "/students" },
          { name: "Gallery", path: "/gallery" },
          { name: "Laboratory", path: "/laboratory" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block lg:inline-block px-3 py-2 rounded transition-all ${
                location.pathname === item.path
                  ? "bg-white text-black font-bold shadow-lg"
                  : "hover:bg-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Menu Button */}
      <button
        ref={buttonRef}
        className="lg:hidden text-white transition-transform duration-300 ease-in-out transform hover:scale-110"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </button>
    </nav>
  );
}
