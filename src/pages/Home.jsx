import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../components/Scene';
import { motion } from 'framer-motion';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';

// Use API_URL from environment variables; fallback to localhost for development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const sectionRef = useRef(null);
  const [recentWorks, setRecentWorks] = useState([]);

  // Fetch portfolio data on component mount and store the first three items as recent work.
  useEffect(() => {
    axios.get(`${API_URL}/portfolio`)
      .then((response) => {
        // If your portfolio items have a creation date, you could sort them:
        // const sortedItems = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // setRecentWorks(sortedItems.slice(0, 3));

        // Otherwise, simply slice the first three items:
        setRecentWorks(response.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error fetching recent works:", err);
      });
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <Scene />
          </Canvas>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-6xl font-bold font-poppins leading-tight mb-6 gsap-fade-up">
                Transforming Ideas into
                <span className="text-gradient"> Visual Excellence</span>
              </h2>
              <p className="text-xl text-gradient mb-8 gsap-fade-up">
                Elevating brands through innovative design solutions since 2020
              </p>
              <button
                className="button-gradient px-8 py-3 rounded-lg font-medium text-white gsap-fade-up"
                onClick={() => (window.location.href = '/contact')}
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] via-[#181818] to-[#0a0a0a] relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ff6d00]/30 to-[#00ffff]/20 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#00ffff]/30 to-[#ff6d00]/20 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-extrabold text-center mb-6 gsap-fade-up text-gradient bg-clip-text drop-shadow-lg">
            <span className="text-gradient">
              Our Featured Services
            </span>
          </h2>
          <p className="text-xl text-center mb-14 gsap-fade-up max-w-2xl mx-auto">
            Discover a full suite of creative solutions designed to elevate your brand and captivate your audience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                href: "/services/logo-design",
                title: "Logo Design",
                desc: "Unique and impactful logos that define your brand identity.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915L7.5 18.68l-4.243.707.707-4.243L16.862 3.487z" /><path d="M15 6l3 3" /></svg>
                ),
              },
              {
                href: "/services/brand-identity-design",
                title: "Brand Identity Design",
                desc: "Cohesive design solutions to establish a strong brand image.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="8" cy="8" r="5" /><circle cx="16" cy="16" r="5" /></svg>
                ),
              },
              {
                href: "/services/packaging-design",
                title: "Packaging Design",
                desc: "Attractive and functional packaging that stands out.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="3 7 12 2 21 7 21 17 12 22 3 17 3 7" /><path d="M3 7l9 5 9-5" /></svg>
                ),
              },
              {
                href: "/services/business-card-design",
                title: "Business Card Design",
                desc: "Professional cards to leave a lasting impression.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 11h2v2H7z" /><path d="M13 11h4" /></svg>
                ),
              },
              {
                href: "/services/letterheads",
                title: "Letterheads",
                desc: "Custom letterhead designs for a professional image.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6" /><path d="M9 11h6" /><path d="M9 15h4" /></svg>
                ),
              },
              {
                href: "/services/label-design",
                title: "Label Design",
                desc: "Eye-catching labels that communicate your product's value.",
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6" /><path d="M9 11h6" /><path d="M9 15h4" /></svg>
                ),
              },
              {
                href: "/services/label-design",
                title: "Label Design",
                desc: "Eye-catching labels that communicate your product's value.",
                icon: (
                  // Tag/label icon
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 7l-10 10" /><rect x="7" y="7" width="10" height="10" rx="2" /></svg>
                ),
              },
              {
                href: "/services/flex-design",
                title: "Flex Design",
                desc: "High-quality flex designs for impactful branding.",
                icon: (
                  // Banner/flex icon
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="6" rx="2" /><rect x="7" y="13" width="10" height="6" rx="2" /></svg>
                ),
              },
              {
                href: "/services/catalog-design",
                title: "Catalog Design",
                desc: "Showcase your products with professionally designed catalogs.",
                icon: (
                  // Open book/catalog icon
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h7a2 2 0 0 1 2 2v12" /><path d="M21 6h-7a2 2 0 0 0-2 2v12" /></svg>
                ),
              },
              {
                href: "/services/brochure-design",
                title: "Brochure Design",
                desc: "Creative brochures to communicate your message.",
                icon: (
                  // Folded brochure icon
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="16" rx="2" /><rect x="14" y="4" width="7" height="16" rx="2" /><path d="M10 8h4" /></svg>
                ),
              },
              {
                href: "/services/banner-design",
                title: "Banner Design",
                desc: "Stunning banners for online and offline campaigns.",
                icon: (
                  // Hanging banner icon
                  <svg className="w-12 h-12 mx-auto mb-4 text-gradient" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="6" rx="2" /><path d="M3 11v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6" /></svg>
                ),
              },
            ].map((service, idx) => (
              <a
                key={service.title}
                href={service.href}
                className={`relative group p-8 rounded-3xl bg-gradient-to-br from-[#181818] via-[#232526] to-[#1a1a1a] shadow-2xl border border-[#232526] hover:scale-105 hover:shadow-3xl transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
                style={{
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span className="inline-block mb-4 animate-bounce">{service.icon}</span>
                <h3 className="text-2xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff6d00] group-hover:from-[#ff6d00] group-hover:to-[#00ffff] transition-colors duration-300 text-gradient drop-shadow-lg">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base mb-4">{service.desc}</p>
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-[#ff6d00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ffff] to-[#ff6d00] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </a>
            ))}
          </div>
          <div className="flex justify-center mt-14">
            <a
              href="/services"
              className="inline-block px-12 py-4 rounded-full bg-gradient-to-r from-[#ff6d00] to-[#00ffff] text-white font-semibold text-lg shadow-xl hover:scale-110 transition-transform duration-300 
                  button-gradient text-white gsap-fade-up border-2 border-white/10"
              style={{
                boxShadow: '0 4px 24px 0 rgba(0,255,255,0.15), 0 1.5px 8px 0 rgba(255,109,0,0.12)',
              }}
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section className="py-24 bg-gradient-to-b from-[#181818] via-[#232526] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00ffff]/20 to-[#ff6d00]/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2
            className="text-5xl font-extrabold text-center mb-12 gsap-fade-up bg-clip-text"
            style={{
              background: "linear-gradient(to right, var(--primary), var(--secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span>
              Recent Work
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentWorks.length > 0 ? (
              recentWorks.map((item, idx) => (
                <div
                  key={item._id}
                  className="relative group overflow-hidden rounded-2xl shadow-2xl border border-[#232526] bg-[#181818] hover:scale-105 transition-transform duration-300"
                  style={{
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
                  }}
                >
                  <img
                    crossOrigin='anonymous'
                    src={`${API_URL}${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg">{item.title}</h3>
                  </div>
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-[#2A3FFB] to-[#FF6B6B] px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg opacity-80">
                    {`#${idx + 1}`}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300 col-span-3">No recent work available.</p>
            )}
          </div>
          <div className="flex justify-center mt-14">
            <a
              href="/portfolio"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff6d00] text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300 
                        button-gradient text-white gsap-fade-up border-2 border-white/10"
            >
              View Full Portfolio
            </a>
          </div>
        </div>
      </section>
      <TestimonialSlider />

      {/* Add the Google Reviews widget */}
      {/* <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 gsap-fade-up text-[#ff6d00]">
            Customer Reviews
          </h2>
          <GoogleReviewsWidget />
        </div>
      </section> */}


      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 gsap-fade-up text-[#ff6d00]">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg text-gray-200 mb-8 gsap-fade-up text-[#00ffff]">
            Contact us today to get started on your next big project.
          </p>
          <button
            className="button-gradient px-8 py-3 rounded-lg font-medium text-white gsap-fade-up"
            onClick={() => (window.location.href = '/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
