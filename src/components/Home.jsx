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
      .then((data) => {
        const updated = Array.isArray(data)
          ? data.map((item) => ({
              ...item,
              src: item.src?.toLowerCase().includes("logo") ? "/omsc_logo.png" : item.src
            }))
          : data;
        setResearchSliderImages(updated);
      })
      .catch((err) => {
        console.error("Error fetching research slider:", err);
        setResearchSliderImages([{
          src: "/omsc_logo.png",
          heading: "Biomass Valorization",
          subheading: "Transforming waste into valuable chemicals"
        }]);
      });

    fetch("https://raw.githubusercontent.com/akashkumar62/labwebsite/main/news.json")
      .then((res) => res.json())
      .then((data) => setNewsItems(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

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
    if (heroSliderImages.length === 0) return;
    const heroInterval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);

    return () => clearInterval(heroInterval);
  }, [heroSliderImages.length]);

  useEffect(() => {
    if (researchSliderImages.length === 0) return;
    const researchInterval = setInterval(() => {
      setResearchIndex((prev) => (prev + 1) % researchSliderImages.length);
    }, 5000);

    return () => clearInterval(researchInterval);
  }, [researchSliderImages.length]);

  return (
    <section id="home" className="font-sans bg-black text-white min-h-screen">
      {/* Hero Section Heading with Animated Accent */}
      <div
        className="w-full text-start py-10 px-4 md:px-14 bg-cover bg-center relative z-10 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGUHgPpE8IVJytFxgCi8mXngZ3mxXfs81bw&s')"
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3 animate-fade-scale">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            IIT (BHU) Varanasi
          </div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-3 tracking-tight animate-slide-up">
            Welcome to the Organometallics and Sustainable Catalysis Lab!
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-4xl leading-relaxed animate-slide-up">
            Our group focuses on the development of{" "}
            <strong className="text-emerald-400 font-semibold">novel ligands</strong>,{" "}
            <strong className="text-emerald-400 font-semibold">base metal complexes</strong>, and{" "}
            <strong className="text-emerald-400 font-semibold">sustainable synthetic methods</strong> that enable the
            valorization of biomass.
          </p>
        </div>
      </div>

      {/* Hero Image Slider with Animations */}
      {heroSliderImages.length === 0 ? (
        <div className="w-full h-[420px] flex justify-center items-center text-white text-xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading hero content...</span>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[440px] md:h-[500px] overflow-hidden group">
          {/* Animated Background Image */}
          <img
            key={`hero-img-${heroIndex}`}
            src={heroSliderImages[heroIndex].src}
            alt="slider"
            className="w-full h-full object-cover animate-fade-scale transition-transform duration-1000 ease-out"
          />

          {/* Gradient Overlay and Animated Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex flex-col justify-center items-end px-8 md:px-16 text-right">
            <div key={`hero-text-${heroIndex}`} className="max-w-2xl animate-slide-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 font-montserrat tracking-tight text-white drop-shadow-md">
                {heroSliderImages[heroIndex].heading}
              </h2>
              <p className="text-lg md:text-2xl text-slate-200 drop-shadow">
                {heroSliderImages[heroIndex].subheading}
              </p>
            </div>
          </div>

          {/* Slider Arrow Controls with Hover Animation */}
          <button
            onClick={prevHeroSlide}
            aria-label="Previous Slide"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-3.5 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            onClick={nextHeroSlide}
            aria-label="Next Slide"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-3.5 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
            {heroSliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === heroIndex ? "w-8 bg-emerald-500 shadow-md shadow-emerald-500/50" : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Research and Values Section with Animated Hover */}
      <div className="bg-slate-100 py-20 border-t border-gray-300 text-black">
        <div className="max-w-6xl mx-auto px-4 md:flex md:space-x-12 md:items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Our Vision
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-3 font-montserrat">
              Research and Values
            </h2>
            <p className="text-gray-500 font-semibold text-lg sm:text-xl">
              Who we are and what we do
            </p>
          </div>
          <div className="md:w-1/2 text-base sm:text-lg text-gray-700 space-y-4 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-2xl sm:text-3xl font-montserrat text-gray-900">
              <b>Welcome to the Sustainable and Green Catalysis Lab!</b>
            </p>
            <p className="leading-relaxed">
              Our group focuses on the development of novel ligands and base metal complexes, and sustainable
              synthetic methods that enable the valorization of biomass. To date, most of the valuable chemicals are
              produced from fossil fuels that result in adverse climate change. Hence, our main motive is the
              synthesis of bio-based chemicals, pharmaceuticals, polymers, etc. from abundant materials using
              inexpensive catalysts concerning sustainability, green chemistry, and circular economy.
            </p>
          </div>
        </div>
      </div>

      {/* News section with Hover Lift & Glow Animations */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20 border-t border-gray-300 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-illustration/glowing-plexus-two-colors-abstract-600nw-2089760452.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="max-w-6xl mx-auto px-4 md:flex md:space-x-12 md:items-center text-white relative z-10">
          {/* Left - Heading */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Updates
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-3 font-montserrat">
              Latest News
            </h2>
            <p className="text-xl text-gray-200">Recent milestones from our laboratory</p>
          </div>

          {/* Right - News Items with Interactive Animations */}
          <div className="md:w-1/2 space-y-4">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="group py-4 px-5 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:border-emerald-500/60 hover:bg-black/70 hover:translate-x-1.5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></span>
                  <h4 className="text-sm font-bold text-emerald-400 font-mono tracking-wider">
                    {item.date}
                  </h4>
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors">
                  {item.content || item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Slider / Logo Spotlight with Smooth Animations */}
      {researchSliderImages.length === 0 ? (
        <div className="w-full h-[400px] flex justify-center items-center text-white text-xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading content...</span>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden bg-black py-8 my-8 md:my-12 group">
          <div className="max-w-5xl mx-auto h-full flex items-center justify-center px-4">
            <img
              key={`research-img-${researchIndex}`}
              src={
                researchSliderImages[researchIndex]?.src?.toLowerCase().includes("logo")
                  ? "/omsc_logo.png"
                  : researchSliderImages[researchIndex]?.src || "/omsc_logo.png"
              }
              alt="research slider"
              className="mx-auto object-contain h-[260px] md:h-[350px] w-auto max-w-[95%] rounded-2xl shadow-xl bg-white p-4 animate-fade-scale transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevResearchSlide}
            aria-label="Previous Research Image"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>
          <button
            onClick={nextResearchSlide}
            aria-label="Next Research Image"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          {researchSliderImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
              {researchSliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setResearchIndex(idx)}
                  aria-label={`Research Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === researchIndex ? "w-6 bg-emerald-500" : "w-2 bg-white/40 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
