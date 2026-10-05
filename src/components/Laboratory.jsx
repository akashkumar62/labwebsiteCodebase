import React, { useEffect, useState } from "react";

export default function Laboratory() {
  const [labData, setLabData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/akashkumar62/labwebsite/main/laboratory.json",
          { mode: "cors" }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const updatedData = Array.isArray(data)
          ? data
              .filter((item) => !item.title?.includes("Manual"))
              .map((item) => {
                if (item.title?.includes("UV-Vis Spectrophotometer")) {
                  return {
                    ...item,
                    title: "UV-Chamber"
                  };
                }
                return item;
              })
          : data;
        setLabData(updatedData);
      } catch (error) {
        console.error("Error fetching laboratory data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, []);

  // Add error handling
  if (error) {
    return (
      <section id="laboratory" className="p-6">
        <h2 className="font-sans text-3xl font-bold text-center mb-6">Laboratory Facilities</h2>
        <p className="text-center text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section id="laboratory" className="p-6">
      <h2 className="font-sans text-3xl font-bold text-center mb-6 border-b-2 pb-2">Laboratory Equipment</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading laboratory data...</p>
      ) : labData ? (
        <>
          {/* Main Laboratory Equipment */}
          <div className="grid md:grid-cols-2 gap-6">
            {labData
              ?.filter((item) => !item.title?.includes("Manual"))
              ?.map((item, index) => {
                const title = item.title?.includes("UV-Vis Spectrophotometer") ? "UV-Chamber" : item.title;
                return (
                  <div key={index} className="bg-gray-100 text-black p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                      {item.image && (
                        <div className="w-full h-56 bg-white rounded-lg p-3 mb-4 flex items-center justify-center border border-gray-200">
                          <img
                            src={item.image}
                            alt={title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400">No data available</p>
      )}
    </section>
  );
}
