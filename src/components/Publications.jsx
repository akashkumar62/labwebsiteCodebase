import { useEffect, useState } from "react";

export default function Publications() {
  const [teachingPubs, setTeachingPubs] = useState([]);
  const [otherPubs, setOtherPubs] = useState([]);

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
      if (withImages) {
        return (
          <div
            key={idx}
            className="rounded-3xl bg-gradient-to-br from-gray-100 to-white shadow-md p-8"
          >
            <div className="md:flex md:items-start md:space-x-8">

              {/* TEXT SECTION */}
              <div className="md:w-1/2 mb-6 md:mb-0">

                {/* TITLE */}
                <div
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {pub.title}
                </div>

                {/* AUTHORS */}
                <div className="text-gray-600 italic text-sm mb-1">
                  {pub.authors}
                </div>

                {/* JOURNAL */}
                <div className="text-gray-600 text-sm mb-3">
                  {pub.journal}
                </div>

                {/* LINK */}
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline inline-block"
                  >
                    Read More
                  </a>
                )}
              </div>

              {/* IMAGES */}
              <div className="md:w-1/2">
                {pub.images && (
                  Array.isArray(pub.images) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pub.images.map((img, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={img}
                          alt={`publication-${idx + 1}-${imgIdx + 1}`}
                          className="w-full h-56 object-contain rounded-xl shadow hover:scale-105 transition-transform"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={pub.images}
                      alt={`publication-${idx + 1}`}
                      className="w-full h-56 object-contain rounded-xl shadow hover:scale-105 transition-transform"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={idx}
            className="p-4 border rounded-lg bg-gray-50 text-left shadow-sm"
          >
            {/* TITLE */}
            <div
              className="font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {idx + 1}. {pub.title}
            </div>

            {/* AUTHORS */}
            <div className="text-gray-600 italic text-sm">
              {pub.authors}
            </div>

            {/* JOURNAL */}
            <div className="text-gray-600 text-sm">
              {pub.journal}
            </div>

            {/* LINK */}
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Read More
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
        <div className="flex flex-col gap-8">

          {/* IIT BHU Publications */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">
              PUBLICATIONS FROM IIT (BHU)
            </h3>
            <div className="space-y-20">
              {renderPublications(otherPubs, true)}
            </div>
          </div>

          {/* Other Publications */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              IMPORTANT PUBLICATIONS FROM POST-DOC AND Ph.D.
            </h3>
            <div className="space-y-4">
              {renderPublications(teachingPubs, false)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}