import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useGetDistrictsQuery } from "../redux/features/districtSlice";

const Home = () => {
  const { data, isLoading } = useGetDistrictsQuery();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const Navigate = useNavigate();
  const districts = [{ value: "kathmandu", label: "Kathmandu" }];

  if (isLoading) {
    <div>loadingg..</div>;
  }
  console.log(data);
  const placesByDistrict = {
    kathmandu: [
      { value: "thamel", label: "Thamel" },
      { value: "new-baneshwor", label: "New Baneshwor" },
      { value: "maharajgunj", label: "Maharajgunj" },
      { value: "balaju", label: "Balaju" },
    ],
  };

  const availablePlaces = selectedDistrict
    ? placesByDistrict[selectedDistrict] || []
    : [];

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1486006396113-c7b36766558b?q=80&w=1600",
      title: "Vehicle & Engine Safety",
      subtitle:
        "Automobile engineering experts ensuring fire safety in transport and industrial machinery.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600",
      title: "Electrical Hazard Audit",
      subtitle:
        "Certified electricians inspecting circuits to prevent short-circuit fire outbreaks.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600",
      title: "Hydrant & Plumbing Systems",
      subtitle:
        "Expert plumbers installing and maintaining high-pressure fire suppression water systems.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581091870627-3a5cbb1c7f6c?q=80&w=1600",
      title: "Industrial Fire Inspection",
      subtitle:
        "Comprehensive safety inspections for factories, warehouses, and heavy industries.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1600",
      title: "Emergency Response Readiness",
      subtitle:
        "Rapid response planning and fire emergency preparedness for homes and businesses.",
    },
  ];
  const handelePlaceChange = (e) => {
    const place = e.traget.value;
    setSelectedPlace(place);

    if (place) {
      Navigate(`/services/${place}`);
    }
  };

  const showSlider = !selectedDistrict;

  return (
    <div className="font-sans text-slate-900">
      <section className="relative h-screen w-full bg-slate-900 overflow-hidden">
        {/* ✅ HERO SLIDER (hide when district selected) */}
        {showSlider && (
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ✅ CENTER CONTENT (always visible) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-8">
            <h1 className="text-5xl font-bold mb-4">Aangan Sewa</h1>
            <p className="mb-8 text-lg">
              Quality home services at your doorstep
            </p>

            <div className="bg-white/90 rounded-xl p-6 text-gray-800  ">
              <p className="mb-4 font-semibold">Where do you need a service?</p>

              <div className="flex flex-row gap-4">
                {/* DISTRICT */}
                <select
                  className="p-3 rounded border"
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedPlace("");
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>

                {/* PLACE */}
                <select
                  className="p-3 rounded border"
                  value={selectedPlace}
                  onChange={handelePlaceChange}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Place</option>
                  {availablePlaces.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGENCY BUTTON */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:block">
          <a
            href="tel:101"
            className="bg-white px-4 py-3 rounded-xl shadow flex gap-3 items-center"
          >
            <FaPhoneAlt className="text-orange-500" />
            <span className="font-bold text-slate-900">Dial 101</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
