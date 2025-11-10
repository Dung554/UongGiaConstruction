// src/pages/Home.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Overview />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}