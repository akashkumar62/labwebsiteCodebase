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
        setLabData(data);
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
            {labData?.map((item, index) => (
              <div key={index} className="bg-gray-100 text-black p-6 rounded-lg shadow-md">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400">No data available</p>
      )}
    </section>
  );
}