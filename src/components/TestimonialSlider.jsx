import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(res.data);
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials, current]);

  const defaultImage = "/assets/default_client.jpg";

  // Carousel navigation
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#111111] via-[#232526] to-[#1a1a1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <svg width="100%" height="100%">
          <circle cx="80%" cy="20%" r="200" fill="#2A3FFB" opacity="0.08" />
          <circle cx="10%" cy="80%" r="150" fill="#2A3FFB" opacity="0.06" />
        </svg>
      </div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-[#2A3FFB] drop-shadow-lg tracking-tight">
          <span className="text-gradient">
            What Our Clients Say
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
          We value our clients and their feedback. Here’s what they have to say about our services.
        </p>
        {testimonials.length > 0 ? (
          <div className="relative">
            <a
              href="#"
              onClick={e => e.preventDefault()}
            >
              <div className="bg-[#181818] rounded-2xl shadow-2xl p-10 flex flex-col items-center transition-all duration-500">
                <img
                  crossOrigin="anonymous"
                  src={
                    testimonials[current].imageUrl
                      ? `http://localhost:5000${testimonials[current].imageUrl}`
                      : defaultImage
                  }
                  alt={testimonials[current].name}
                  className="w-24 h-24 rounded-full border-4 border-[#2A3FFB] shadow-lg mb-6 object-cover"
                />
                <p className="text-xl text-gray-200 italic mb-6 text-center leading-relaxed">
                  “{testimonials[current].message}”
                </p>
                <div className="mb-4 flex justify-center">
                  {Array.from({ length: testimonials[current].rating || 0 }).map(
                    (_, index) => (
                      <FaStar key={index} size={20} color="#ffc107" />
                    )
                  )}
                </div>
                <h4 className="text-lg font-bold text-[#2A3FFB]">
                  - {testimonials[current].name}
                </h4>
              </div>
            </a>
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#2A3FFB] hover:bg-[#FF6B6B] text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none"
              aria-label="Previous"
              style={{ transform: "translateY(-50%)" }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2A3FFB] hover:bg-[#FF6B6B] text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none"
              aria-label="Next"
              style={{ transform: "translateY(-50%)" }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === current ? "bg-[#2A3FFB]" : "bg-gray-500"
                    }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-300 text-center">No testimonials available.</p>
        )}
      </div>
    </section>
  );
};

export { TestimonialSlider };
