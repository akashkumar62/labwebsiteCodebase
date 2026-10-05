import React, { useEffect, useState } from "react";

export default function Research() {
  const [projects, setProjects] = useState([]);
  const [highlightSections, setHighlightSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  useEffect(() => {
    const fetchResearchData = async () => {
      try {
        const projectsRes = await fetch(
          "https://raw.githubusercontent.com/akashkumar62/labwebsite/main/research.json"
        );
        const highlightsRes = await fetch(
          "https://raw.githubusercontent.com/akashkumar62/labwebsite/main/researchHighlights.json"
        );

        const projectData = await projectsRes.json();
        const highlightsData = await highlightsRes.json();

        setProjects(projectData);
        setHighlightSections(highlightsData);
      } catch (error) {
        console.error("Error fetching research data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchData();
  }, []);

  return (
    <section id="research" className="bg-white text-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold font-montserrat text-center mb-12">
          Our Research Focus
        </h2>

        {/* Highlighted Research Sections */}
        <div className="space-y-16 mt-10">
          {highlightSections.map((section, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gradient-to-br from-gray-100 to-white shadow-md p-6 sm:p-10 border border-gray-200"
            >
              <div className="md:flex md:items-center md:space-x-8">
                {/* Description */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
                    {section.description}
                  </p>
                </div>

                {/* Formatted and Resized Figures */}
                <div
                  className={`md:w-1/2 ${
                    section.images?.length === 1
                      ? "flex justify-center"
                      : "grid grid-cols-1 sm:grid-cols-2 gap-5"
                  }`}
                >
                  {section.images?.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDiagram(img)}
                      className="group cursor-pointer bg-white p-3 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-500/60 transition-all duration-300 flex flex-col items-center justify-between h-64 sm:h-72 w-full"
                      title="Click to enlarge diagram"
                    >
                      {/* Diagram Container */}
                      <div className="w-full h-52 sm:h-60 flex items-center justify-center overflow-hidden rounded-xl">
                        <img
                          src={img}
                          alt={`Research diagram ${idx + 1}`}
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-emerald-700 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        🔍 Click to enlarge diagram
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagram Lightbox Modal */}
      {selectedDiagram && (
        <div
          onClick={() => setSelectedDiagram(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center overflow-auto"
          >
            <button
              onClick={() => setSelectedDiagram(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="w-full max-h-[75vh] flex items-center justify-center p-2">
              <img
                src={selectedDiagram}
                alt="Enlarged chemical diagram"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500 font-sans">
              OMSC Laboratory • Chemical Reaction Scheme & Catalysis
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
