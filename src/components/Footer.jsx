import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link from React Router
import {
  faFacebook,
  faTwitter,
  faGoogleScholar,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";


export default function Footer() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <footer className="font-sans bg-gray-800 text-gray-400 p-8">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="max-w-52 mb-6 md:mb-0">
          <h2 className="text-white text-lg font-bold">OMSC Lab</h2>
          <p className="text-sm">
           Advancing on the development of novel ligands and base metal complexes, and sustainable synthetic methods that enable the valorization of biomass.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/research" className="hover:text-white">Research</Link></li>
            <li><Link to="/publications" className="hover:text-white">Publications</Link></li>
            {/* <li><Link to="/laboratory" className="hover:text-white">Laboratory</Link></li> */}
            <li><Link to="/students" className="hover:text-white">Team</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            {/* <li><Link to="/about" className="hover:text-white">About</Link></li> */}
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-white font-semibold">Contact Info</h3>
          <p className="text-sm">📍 Department of Chemistry,IIT BHU(Varanasi)</p>
          <p>
            <a href="mailto:saravana.chy@itbhu.ac.in" 
              className="text-blue-400 hover:underline text-md">📧saravana.chy@itbhu.ac.in</a>
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-white font-semibold">Connect With Us</h3>
          <div className="flex space-x-3 mt-2">
            <a href="https://www.linkedin.com/in/saravanakumar-elangovan-9408a271/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://scholar.google.com/citations?user=fQg3EjcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-white">
              <FontAwesomeIcon icon={faGoogleScholar} size="lg" />
            </a>
            <a href="https://orcid.org/0000-0003-2694-9989" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-white">
              <FontAwesomeIcon icon={faOrcid} size="lg" />
            </a>
            <a href="https://www.researchgate.net/profile/Saravanakumar-Elangovan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faResearchgate} size="lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 OMSC Lab. All rights reserved. 
      </div>
    </footer>
  );
}
