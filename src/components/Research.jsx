import React, { useEffect, useState } from "react";

export default function Research() {
  const [projects, setProjects] = useState([]);
  const [highlightSections, setHighlightSections] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="space-y-20 mt-10">
          {highlightSections.map((section, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gradient-to-br from-gray-100 to-white shadow-md p-8"
            >
              <div className="md:flex md:items-start md:space-x-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-3xl font-semibold mb-4">{section.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {section.description}
                  </p>
                </div>

                <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`research-${idx}`}
                      className="w-full h-56 object-cover rounded-xl shadow hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
