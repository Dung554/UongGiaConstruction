// src/pages/Home.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
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
        href="https://zalo.me/0383673904"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 w-14 h-14 flex items-center justify-center"
        title="Chat với chúng tôi trên Zalo"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}