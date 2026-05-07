import { useEffect, useState } from "react";
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/refs/heads/main/gallery/images.json")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, []);

  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="gallery" className="p-4 text-center">
    <h2 className="text-2xl font-bold mb-4 border-b pb-1">Gallery</h2>
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {images.slice(0, visibleCount).map((src, index) => (
        <img 
          key={index} 
          src={src} 
          alt={`Gallery Image ${index + 1}`} 
          className="w-full h-auto object-cover"
        />
      ))}
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
