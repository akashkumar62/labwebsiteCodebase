
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [heroSliderImages, setHeroSliderImages] = useState([]);
  const [researchSliderImages, setResearchSliderImages] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [researchIndex, setResearchIndex] = useState(0);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/heroSlider.json")
      .then((res) => res.json())
      .then((data) => setHeroSliderImages(data))
      .catch((err) => console.error("Error fetching hero slider:", err));
  
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/researchSlider.json")
      .then((res) => res.json())
      .then((data) => setResearchSliderImages(data))
      .catch((err) => console.error("Error fetching research slider:", err));
  
    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/news.json")
      .then((res) => res.json())
      .then((data) => setNewsItems(data))
      .catch((err) => console.error("Error fetching news:", err));

  }
  , []);

  const nextHeroSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex + 1) % heroSliderImages.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex - 1 + heroSliderImages.length) % heroSliderImages.length);
  };

  const nextResearchSlide = () => {
    setResearchIndex((prevIndex) => (prevIndex + 1) % researchSliderImages.length);
  };

  const prevResearchSlide = () => {
    setResearchIndex((prevIndex) => (prevIndex - 1 + researchSliderImages.length) % researchSliderImages.length);
  };

  

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);

    const researchInterval = setInterval(() => {
      setResearchIndex((prev) => (prev + 1) % researchSliderImages.length);
    }, 5000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(researchInterval);
    };
  }, [heroSliderImages.length, researchSliderImages.length]);

  return (
    
    <section id="home" className="font-sans bg-black text-white min-h-screen">
       
       {/* Hero Section Heading */}
       <div
        className="w-full text-start py-8 px-2 md:px-14 bg-cover bg-center relative z-10"
        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGUHgPpE8IVJytFxgCi8mXngZ3mxXfs81bw&s')" }}
      >
       <h1 className="font-montserrat mx-1 md:ml-10 md:mr-8 text-3xl md:text-4xl font-bold mb-2 tracking-tight">
        The Organometallics and Sustainable Catalysis Lab
        </h1>
       <p className="mx-1 md:ml-10 md:mr-8 text-xl md:text-xl">
          We focus on the development of <strong className="text-emerald-600">novel ligands</strong> and <strong className="text-emerald-600">base metal complexes</strong>, and
           sustainable synthetic methods that enable the <strong className="text-emerald-600">valorization of biomass</strong>.
        </p>
    </div>


      {/* Use heroSliderImages[heroIndex] and researchSliderImages[researchIndex] as before */}
            {/* Hero Image Slider */}
            {heroSliderImages.length === 0 ? (
  <div className="w-full h-[400px] flex justify-center items-center text-white text-xl">
    Loading hero content...
  </div>
) : (
  <div className="relative w-full h-[400px] overflow-hidden">
    <img
      src={heroSliderImages[heroIndex].src}
      alt="slider"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-end px-12 text-right">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        {heroSliderImages[heroIndex].heading}
      </h2>
      <p className="text-xl md:text-2xl mb-6">
        {heroSliderImages[heroIndex].subheading}
      </p>
      {/* <a
        href={heroSliderImages[heroIndex].buttonLink}
        className="inline-flex items-center bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.69 4.972L12 20l-6.85-4.45a12.083 12.083 0 01.69-4.972L12 14z" />
        </svg>
        {heroSliderImages[heroIndex].buttonText}
      </a> */}
    </div>
    <button
      onClick={prevHeroSlide}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80"
    >
      <ChevronLeft className="text-white" />
    </button>
    <button
      onClick={nextHeroSlide}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80"
    >
      <ChevronRight className="text-white" />
    </button>
  </div>
)}



             {/* Research and Values Section */}
      <div className="bg-slate-100 py-20 border-t border-gray-300 text-black">
        <div className="max-w-6xl mx-auto px-4 md:flex md:space-x-12 md:items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-5xl font-semibold text-gray-900 mb-3 font-montserrat">Research and values</h2>
            <p className="text-gray-500 font-semibold text-xl">Who we are and what we do</p>
          </div>
          <div className="md:w-1/2 text-lg text-gray-700 space-y-4">
          <p className="text-4xl font-montserrat">
              <b>Welcome to the Sustainable and Green Catalysis Lab!</b> 
            </p>
            <p>
              Our group focuses on the development of novel ligands and base metal complexes, and
              sustainable synthetic methods that enable the valorization of biomass. To date, most of the
              valuable chemicals are produced from fossil fuels that result in adverse climate change. Hence,
              our main motive is the synthesis of bio-based chemicals, pharmaceuticals, polymers, etc. from
              abundant materials using inexpensive catalysts concerning sustainability, green chemistry, and
              circular economy.
            </p>
            
          </div>
        </div>
      </div>

      {/* News section */}
      <div
  className="bg-cover bg-center bg-no-repeat py-20 border-t border-gray-300"
  style={{
    backgroundImage:
      "url('https://www.shutterstock.com/image-illustration/glowing-plexus-two-colors-abstract-600nw-2089760452.jpg')",
  }}
>
  <div className="max-w-6xl mx-auto px-4 md:flex md:space-x-12 md:items-center text-white">
    {/* Left - Heading */}
    <div className="md:w-1/2 mb-10 md:mb-0">
      <h2 className="text-5xl font-semibold text-white mb-3 font-montserrat">Latest News</h2>
      <p className="text-xl text-gray-200">Updates from our lab</p>
    </div>

    {/* Right - News Items */}
    <div className="md:w-1/2 space-y-6">
      {newsItems.map((item, index) => (
        <div
          key={index}
          className="py-2 pr-4 bg-black bg-opacity-40 rounded-lg shadow"
        >
          <h4 className="text-lg font-semibold mb-1">{item.date}</h4>
          <p className="text-gray-300">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
</div>


      {researchSliderImages.length === 0 ? (
  <div className="w-full h-[400px] flex justify-center items-center text-white text-xl">
    Loading content...
  </div>
) : (
  <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-black my-8 md:my-12">
<img
  src={researchSliderImages[researchIndex].src}
  alt="research slider"
  className="mx-auto object-contain h-[280px] md:h-[380px] w-[95%] rounded-lg shadow-md"
/>

    {/* <div className=" inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-start px-12 text-left">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        {researchSliderImages[researchIndex].heading}
      </h2>
      <p className="text-xl md:text-2xl mb-6">
        {researchSliderImages[researchIndex].subheading}
      </p>
      <a
        href={researchSliderImages[researchIndex].buttonLink}
        className="inline-flex items-center bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.69 4.972L12 20l-6.85-4.45a12.083 12.083 0 01.69-4.972L12 14z" />
        </svg>
        {researchSliderImages[researchIndex].buttonText}
      </a>
    </div> */}
    <button
      onClick={prevResearchSlide}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80"
    >
      <ChevronLeft className="text-white" />
    </button>
    <button
      onClick={nextResearchSlide}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80"
    >
      <ChevronRight className="text-white" />
    </button>
  </div>
)}


    </section>
  );
}
