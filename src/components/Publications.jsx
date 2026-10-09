import { useEffect, useState } from "react";

export default function Publications() {
  const [teachingPubs, setTeachingPubs] = useState([]);
  const [otherPubs, setOtherPubs] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const teachingRes = await fetch(
          "https://raw.githubusercontent.com/akashkumar62/labwebsite/main/publications/publications1.json"
        );
        const otherRes = await fetch(
          "https://raw.githubusercontent.com/akashkumar62/labwebsite/main/publications/publications.json"
        );

        const teachingData = await teachingRes.json();
        const otherData = await otherRes.json();

        setTeachingPubs(teachingData);
        setOtherPubs(otherData);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  const renderPublications = (list, withImages = false) =>
    list.map((pub, idx) => {
      const pubNumber = list.length - idx;
      const cleanTitle = pub.title ? pub.title.trim().replace(/^\d+\.\s*/, "") : "";

      if (withImages) {
        return (
          <div
            key={idx}
            className="group rounded-3xl bg-gradient-to-br from-gray-100 to-white shadow-md hover:shadow-xl p-6 sm:p-8 border border-gray-200 transition-all duration-300"
          >
            <div className="md:flex md:items-center md:space-x-8">
              {/* TEXT SECTION */}
              <div className="md:w-1/2 mb-6 md:mb-0 flex flex-col justify-between">
                <div>
                  {/* TITLE */}
                  <div
                    className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <span className="text-blue-600 font-extrabold mr-2">
                      {pubNumber}.
                    </span>
                    {cleanTitle}
                  </div>

                  {/* AUTHORS */}
                  <div className="text-gray-600 italic text-sm mb-2 leading-relaxed">
                    {pub.authors}
                  </div>

                  {/* JOURNAL */}
                  <div className="text-gray-800 font-semibold text-sm mb-4">
                    {pub.journal}
                  </div>
                </div>

                {/* LINK */}
                {pub.link && (
                  <div>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
                    >
                      <span>Read Article / DOI</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* RESIZED AND FORMATTED FIGURES / DIAGRAMS */}
              <div className="md:w-1/2">
                {pub.images ? (
                  Array.isArray(pub.images) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pub.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => setSelectedFigure({ src: img, title: `${pubNumber}. ${cleanTitle}`, journal: pub.journal })}
                          className="h-60 sm:h-64 w-full flex flex-col items-center justify-between p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer group/fig"
                          title="Click to enlarge graphical abstract"
                        >
                          <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                            <img
                              src={img}
                              alt={`publication-${pubNumber}-${imgIdx + 1}`}
                              className="max-h-full max-w-full object-contain transform group-hover/fig:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-blue-600 mt-1 opacity-80 group-hover/fig:opacity-100">
                            🔍 Click to enlarge scheme
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelectedFigure({ src: pub.images, title: `${pubNumber}. ${cleanTitle}`, journal: pub.journal })}
                      className="h-60 sm:h-72 w-full flex flex-col items-center justify-between p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer group/fig"
                      title="Click to enlarge graphical abstract"
                    >
                      <div className="w-full h-52 sm:h-60 flex items-center justify-center overflow-hidden">
                        <img
                          src={pub.images}
                          alt={`publication-${pubNumber}`}
                          className="max-h-full max-w-full object-contain transform group-hover/fig:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-blue-600 mt-1 opacity-80 group-hover/fig:opacity-100">
                        🔍 Click to enlarge scheme
                      </span>
                    </div>
                  )
                ) : (
                  /* Fallback when no graphical abstract is provided */
                  <div className="h-60 sm:h-72 w-full flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400 text-center">
                    <span className="text-3xl mb-2">📄</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {pub.journal?.split(",")[0] || "Research Article"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Graphical abstract available via publisher link</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={idx}
            className="p-5 border rounded-2xl bg-gray-50 text-left shadow-sm hover:shadow-md transition-shadow"
          >
            {/* TITLE */}
            <div
              className="font-bold text-gray-900 text-base mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {idx + 1}. {pub.title}
            </div>

            {/* AUTHORS */}
            <div className="text-gray-600 italic text-sm mb-1">
              {pub.authors}
            </div>

            {/* JOURNAL */}
            <div className="text-gray-700 font-medium text-sm mb-2">
              {pub.journal}
            </div>

            {/* LINK */}
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-xs font-semibold inline-block"
              >
                Read More ↗
              </a>
            )}
          </div>
        );
      }
    });

  return (
    <section id="publications" className="bg-white text-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold font-montserrat text-center mb-12">Publications</h2>
        <div className="flex flex-col gap-12">

          {/* IIT BHU Publications */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 border-b pb-3 text-gray-900">
              PUBLICATIONS FROM IIT (BHU)
            </h3>
            <div className="space-y-10">
              {renderPublications(otherPubs, true)}
            </div>
          </div>

          {/* Other Publications */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 border-b pb-3 text-gray-900">
              IMPORTANT PUBLICATIONS FROM POST-DOC AND Ph.D.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderPublications(teachingPubs, false)}
            </div>
          </div>
        </div>
      </div>

      {/* Graphical Abstract Full-Size Modal */}
      {selectedFigure && (
        <div
          onClick={() => setSelectedFigure(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center overflow-auto"
          >
            <button
              onClick={() => setSelectedFigure(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="w-full max-h-[75vh] flex items-center justify-center p-2">
              <img
                src={selectedFigure.src}
                alt={selectedFigure.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 w-full text-center">
              <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
                {selectedFigure.journal}
              </span>
              <p className="font-montserrat font-bold text-gray-900 text-base sm:text-lg mt-1">
                {selectedFigure.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}