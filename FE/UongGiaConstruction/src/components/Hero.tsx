// src/components/Hero.tsx
import { useInView } from '../hooks/useInView';
import heroImg from '../assets/herosection.jpg';

export default function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section ref={ref} className="relative w-full h-screen bg-cover bg-center overflow-hidden">
      {/* Background image với overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/60 to-blue-800/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center text-white z-10">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${isInView ? 'animate-fade-in-down' : 'opacity-0'}`}>
            Kiến tạo công trình
          </h1>
          
          <h2 className={`text-3xl md:text-4xl font-semibold mb-8 text-blue-100 ${isInView ? 'animate-fade-in-down delay-100' : 'opacity-0'}`}>
          Xây dựng tổ ấm - Xây dựng niềm tin
          </h2>
          
          <p className={`text-lg md:text-xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed ${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          Uông Gia đồng hành cùng bạn kiến tạo không gian sống bền vững, nơi khởi nguồn của hạnh phúc và niềm tin.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isInView ? 'animate-bounce-in delay-300' : 'opacity-0'}`}>
            <button 
              onClick={() => scrollToSection('overview')}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
            >
              Tìm hiểu thêm
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
            >
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isInView ? 'animate-bounce' : ''}`}>
        <svg 
          className="w-6 h-6 text-white opacity-70" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
}