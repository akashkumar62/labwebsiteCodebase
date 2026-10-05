import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGraduationCap, faIdBadge, faUserGraduate, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { initialStudents } from "../data/studentsData";

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("All");
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/students.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((remoteData) => {
        if (Array.isArray(remoteData) && remoteData.length > 0) {
          // Normalize remote data: ensure former Masters members are moved to Alumni
          const normalized = remoteData.map((item) => {
            const isFormerMaster =
              item.role?.toLowerCase().includes("master") ||
              item.name?.toLowerCase().includes("upasana") ||
              item.name?.toLowerCase().includes("himanshu");

            if (isFormerMaster) {
              return {
                ...item,
                role: item.name?.toLowerCase().includes("upasana") || item.name?.toLowerCase().includes("himanshu") 
                  ? "Alumni (M.Sc.)" 
                  : "Alumni",
                category: "Alumni"
              };
            }

            const isPhd = item.role?.toLowerCase().includes("phd");
            return {
              ...item,
              role: isPhd ? "PhD Scholar" : item.role,
              category: isPhd ? "PhD" : "Alumni"
            };
          });
          setStudents(normalized);
        }
      })
      .catch((err) => {
        console.warn("Using local verified students data:", err.message);
        setStudents(initialStudents);
      });
  }, []);

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getInitials = (name) => {
    if (!name) return "OM";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Masters is kept deliberately empty per requirement
  const filteredStudents =
    filter === "All"
      ? students
      : filter === "PhD"
      ? students.filter((s) => s.category === "PhD" || s.role?.toLowerCase().includes("phd"))
      : filter === "Masters"
      ? students.filter((s) => s.category === "Masters" || (s.role?.toLowerCase().includes("master") && !s.role?.toLowerCase().includes("alumni")))
      : filter === "Alumni"
      ? students.filter((s) => s.category === "Alumni" || s.role?.toLowerCase().includes("alumni"))
      : students;

  const phdCount = students.filter((s) => s.category === "PhD" || s.role?.toLowerCase().includes("phd")).length;
  const mastersCount = students.filter((s) => s.category === "Masters" || (s.role?.toLowerCase().includes("master") && !s.role?.toLowerCase().includes("alumni"))).length;
  const alumniCount = students.filter((s) => s.category === "Alumni" || s.role?.toLowerCase().includes("alumni")).length;

  return (
    <section id="team" className="bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            People & Mentorship
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-montserrat">
            Our Research Team
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Dedicated researchers and scholars driving innovation in organometallic chemistry, homogeneous catalysis, and sustainable synthesis at IIT (BHU) Varanasi.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mb-12">
          <button
            onClick={() => setFilter("All")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              filter === "All"
                ? "bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
            }`}
          >
            <span>All Members</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              filter === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {students.length}
            </span>
          </button>

          <button
            onClick={() => setFilter("PhD")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              filter === "PhD"
                ? "bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
            }`}
          >
            <span>PhD Scholars</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              filter === "PhD" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {phdCount}
            </span>
          </button>

          <button
            onClick={() => setFilter("Masters")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              filter === "Masters"
                ? "bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
            }`}
          >
            <span>Masters Students</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              filter === "Masters" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {mastersCount}
            </span>
          </button>

          <button
            onClick={() => setFilter("Alumni")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              filter === "Alumni"
                ? "bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
            }`}
          >
            <span>Alumni</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              filter === "Alumni" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {alumniCount}
            </span>
          </button>
        </div>

        {/* Empty State for Masters Category */}
        {filter === "Masters" && filteredStudents.length === 0 && (
          <div className="max-w-2xl mx-auto my-12 bg-white border border-slate-200/90 rounded-3xl p-10 text-center shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-5 text-2xl">
              <FontAwesomeIcon icon={faUserGraduate} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-montserrat">
              No Current Master's Students
            </h3>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
              All previous master's thesis scholars have successfully defended and graduated! Their thesis work is archived in our <button onClick={() => setFilter("Alumni")} className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800">Alumni section</button>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setFilter("Alumni")}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-colors border border-slate-300"
              >
                View Alumni Directory
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-700/20 inline-flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                <span>Inquire for Master's Projects</span>
              </Link>
            </div>
          </div>
        )}

        {/* Members Grid */}
        {filteredStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudents.map((student, index) => {
              const hasError = imageErrors[index] || !student.image || student.image.includes("backup.png");
              const isAlumni = student.category === "Alumni" || student.role?.toLowerCase().includes("alumni");

              return (
                <div
                  key={index}
                  className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:shadow-slate-200 flex flex-col justify-between"
                >
                  {/* Top: Avatar and Role Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      {/* Standardized Avatar Container */}
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-emerald-600 transition-colors shadow-sm bg-slate-100 flex items-center justify-center">
                          {hasError ? (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-slate-50 to-teal-100 flex flex-col items-center justify-center text-slate-700">
                              <span className="text-xl sm:text-2xl font-bold font-montserrat text-emerald-800">
                                {getInitials(student.name)}
                              </span>
                              <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">OMSC</span>
                            </div>
                          ) : (
                            <img
                              src={student.image}
                              alt={student.name}
                              onError={() => handleImageError(index)}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      </div>

                      {/* Status / Role Badge */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                            isAlumni
                              ? "bg-teal-50 text-teal-800 border-teal-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {student.role || (isAlumni ? "Alumni" : "PhD Scholar")}
                        </span>
                        {student.year && (
                          <span className="text-xs text-slate-500 font-mono">
                            {student.year}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Member Name */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-montserrat">
                      {student.name}
                    </h3>

                    {/* Email */}
                    {student.email ? (
                      <a
                        href={`mailto:${student.email}`}
                        className="text-xs text-slate-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 mt-1 break-all"
                        title={student.email}
                      >
                        <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 text-[11px]" />
                        <span>{student.email}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic block mt-1">OMSC Research Group</span>
                    )}

                    {/* Research Focus */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                        {isAlumni ? "Thesis / Project Work" : "Research Focus"}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                        {student.focus || "Organometallic catalysis and sustainable synthesis."}
                      </p>
                    </div>
                  </div>

                  {/* Footer: Social & Academic Links */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">
                      {isAlumni ? "Alumni Network" : "IIT (BHU)"}
                    </span>

                    <div className="flex items-center space-x-2.5">
                      {student.linkedin && (
                        <a
                          href={student.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${student.name}'s LinkedIn`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 border border-slate-200 flex items-center justify-center transition-colors text-sm"
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                      )}
                      {student.scholar && (
                        <a
                          href={student.scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${student.name}'s Google Scholar`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 border border-slate-200 flex items-center justify-center transition-colors text-sm"
                        >
                          <FontAwesomeIcon icon={faGraduationCap} />
                        </a>
                      )}
                      {student.orcid && (
                        <a
                          href={student.orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${student.name}'s ORCID`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 border border-slate-200 flex items-center justify-center transition-colors text-sm"
                        >
                          <FontAwesomeIcon icon={faIdBadge} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Join the Lab Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-emerald-200 rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Open Positions
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-montserrat">
              Interested in joining our research group?
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              We welcome motivated Ph.D. candidates, postdocs, and master's project students with a passion for organometallics, catalysis, and green chemistry.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 flex-shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-emerald-700/20"
            >
              Contact Dr. Saravanakumar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
