import { useEffect, useState } from "react";
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/refs/heads/main/gallery/images.json")
      .then((response) => response.json())
      .then((data) => {
        const updated = Array.isArray(data)
          ? data.map((src) =>
              typeof src === "string" && src.toLowerCase().includes("logo") ? "/omsc_logo.png" : src
            )
          : data;
        setImages(updated);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, []);

  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="gallery" className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 border-b pb-1">Gallery</h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.slice(0, visibleCount).map((src, index) => {
          const isLogo = typeof src === "string" && (src.toLowerCase().includes("logo") || src === "/omsc_logo.png");
          const finalSrc = isLogo ? "/omsc_logo.png" : src;
          return (
            <img
              key={index}
              src={finalSrc}
              alt={isLogo ? "OMSC Lab Logo" : `Gallery Image ${index + 1}`}
              className={`w-full h-auto object-cover rounded-xl shadow-sm ${
                isLogo ? "bg-white p-3 border border-gray-200" : ""
              }`}
            />
          );
        })}
      </div>
      {visibleCount < images.length && (
        <button
          onClick={loadMoreImages}
          className="mt-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Load More
        </button>
      )}
    </section>


  );
}
