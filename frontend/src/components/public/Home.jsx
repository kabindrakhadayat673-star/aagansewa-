import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FaArrowRight, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1486006396113-c7b36766558b?q=80&w=1600", // Automobile/Mechanical
      title: "Vehicle & Engine Safety",
      subtitle:
        "Automobile engineering experts ensuring fire safety in transport and industrial machinery.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600", // Electrical Working
      title: "Electrical Hazard Audit",
      subtitle:
        "Certified electricians inspecting circuits to prevent short-circuit fire outbreaks.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600", // Plumbing/Hydrant
      title: "Hydrant & Plumbing Systems",
      subtitle:
        "Expert plumbers installing and maintaining high-pressure fire suppression water systems.",
    },
  ];

  return (
    <div className="font-sans text-slate-900">
      {/* --- HERO SLIDER SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content Area */}
                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center z-10">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-widest animate-bounce">
                      Agan Sewa Official
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                      {slide.title.split(" ").map((word, i) =>
                        word === "Fire" ||
                        word === "Safety" ||
                        word === "Nepal" ? (
                          <span key={i} className="text-orange-500">
                            {" "}
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )
                      )}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <NavLink
                        to="/services"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-orange-500/30"
                      >
                        Start Application <FaArrowRight />
                      </NavLink>
                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">
                        View Branches
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Quick Action (Phone) */}
        <div className="absolute bottom-10 right-10 z-20 hidden md:block">
          <a
            href="tel:101"
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-2xl border-l-4 border-orange-500 hover:-translate-y-2 transition-transform"
          >
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600 animate-pulse text-xl">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">
                Emergency
              </p>
              <p className="text-xl font-black text-slate-900 tracking-tight">
                Dial 101
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Services ya aru section yaha bata thapna sakincha */}
    </div>
  );
};

export default Home;