// src/pages/Home.tsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import Overview from "../components/Overview";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import zaloIcon from "../assets/zaloicon.png";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    if (location.hash) {
      // Remove the # from hash
      const sectionId = location.hash.substring(1);

      // Wait for page to render then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    // Cleanup
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="overview">
        <Overview />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />

      {/* Zalo Button - Fixed */}
      <a
        href="https://zalo.me/0987778548"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 w-14 h-14 flex items-center justify-center"
        title="Chat với chúng tôi trên Zalo"
      >
        <img
          src={zaloIcon}
          alt="Zalo"
          className="w-8 h-8 object-contain rounded-full"
        />
      </a>
    </div>
  );
}
