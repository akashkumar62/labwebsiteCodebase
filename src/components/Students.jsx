import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faFacebook,
  faTwitter,
  faGoogleScholar,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";


export default function Students() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/students.json")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const filterStudents = (category) => setFilter(category);

  const filteredStudents =
    filter === "All" ? students : students.filter((s) => s.role.includes(filter));

  return (
    <section id="team" className="bg-slate-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold font-montserrat text-center mb-12">
          Our Research Team
        </h2>

      {/* Proff */}

      <div className="max-w-7xl  mx-auto py-12 px-6 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* TEXT */}
          <div className="space-y-6">
            <div className="text-start">

              <h2 className="text-3xl font-bold font-montserrat mb-3">
                Dr. Saravanakumar Elangovan
              </h2>

              <p className="text-lg text-gray-200">
                Assistant Professor, Department of Chemistry
              </p>

              <p className="text-lg text-gray-200 mb-2">
                IIT (BHU) Varanasi
              </p>

              <p className="font-semibold font-montserrat mt-2">
                Area of Interest:
              </p>
              <p>
                Organometallic Chemistry, Homogeneous Catalysis,
                Biomass Conversions, Green Chemistry
              </p>

              <p className="font-semibold font-montserrat">
                Email:{" "}
                <a
                  href="mailto:saravana.chy@iitbhu.ac.in"
                  className="text-blue-600 underline"
                >
                  saravana.chy@iitbhu.ac.in
                </a>
              </p>


               {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 text-2xl">
              <a
                href="https://www.researchgate.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-600"
              >
                <FontAwesomeIcon icon={faResearchgate} />
              </a>
              <a
                href="https://scholar.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-600"
              >
                <FontAwesomeIcon icon={faGoogleScholar} />
              </a>
              <a
                href="https://orcid.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-lime-600"
              >
                <FontAwesomeIcon icon={faOrcid} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-sky-400"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-sky-400"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>

              <a
                href="/about"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-0">
            <img
              className="w-full md:w-3/4 shadow-lg"
              src="/saravan_sir.jpeg"
              alt="Professor"
            />
          </div>
        </div>
      </div>


      <div className="flex justify-center flex-wrap gap-4 mb-28">
        {["All", "PhD", "Masters", "Alumni"].map((category) => (
          <button
            key={category}
            onClick={() => filterStudents(category)}
            className={`px-4 py-2 rounded-lg border hover:bg-blue-600 transition ${
              filter === category ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            {category === "PhD"
              ? "PhD Students"
              : category === "Masters"
              ? "Masters Students"
              : category}
          </button>
        ))}
      </div>

<div className="md:mx-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {filteredStudents.map((student, index) => (
    <div
      key={index}
      className="bg-stone-700 md:w-auto mb-14  text-black p-6  shadow-md hover:shadow-lg transition-shadow duration-300 relative pt-20" // Increased pt-20 for larger image
    >
      {/* Student Image - Positioned higher with dotted border */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="p-4 rounded-full border-2 border-dotted border-gray-300"> {/* Dotted border container */}
          <img
            src={student.image}
            alt={student.name}
            className="w-40 h-40 object-cover rounded-full" // Larger image size
          />
        </div>
      </div>

      {/* Student Info - Starts below the image */}
      <div className="mt-20 text-center"> {/* Adjusted mt-10 for larger image */}
        {/* Name and Email */}
        <h3 className="text-white text-xl font-bold">{student.name}</h3>
        <p className="text-blue-500 font-medium mb-1">{student.role}</p>
        <a 
          href={`mailto:${student.email}`} 
          className="text-slate-200 hover:underline text-sm block mb-3 cursor-pointer"
        >
          {student.email}
        </a>

        {/* Research Focus */}
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Research Field</h4>
          <p className="text-sm text-orange-300">
            {student.focus}
          </p>
        </div>

        {/* Year and Social Links */}
        <div className="flex flex-col items-center space-y-2">
  <p className="text-xs text-gray-500">Year: {student.year}</p>
  <div className="flex space-x-4">
    {student.linkedin && (
      <a
        href={student.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
    )}
    {student.scholar && (
      <a
        href={student.scholar}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-800"
        title="Google Scholar"
      >
        <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      </a>
    )}
    {student.orcid && (
      <a
        href={student.orcid}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-800"
        title="ORCID"
      >
        <FontAwesomeIcon icon={faIdBadge} size="lg" />
      </a>
    )}
  </div>
</div>
      </div>
    </div>
  ))}
</div></div>

    </section>
  );
}
