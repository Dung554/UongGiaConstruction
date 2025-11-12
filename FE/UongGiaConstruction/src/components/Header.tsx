// src/components/Header.tsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex gap-8 absolute md:static top-16 left-0 right-0 md:gap-8 flex-col md:flex-row bg-blue-900 md:bg-transparent p-4 md:p-0 w-full md:w-auto`}>
          <li><a href="/" className="hover:text-blue-300 transition">Trang chủ</a></li>
          <li><a href="#projects" className="hover:text-blue-300 transition">Dự án</a></li>
          <li><a href="#services" className="hover:text-blue-300 transition">Dịch vụ</a></li>
          <li><a href="#contact" className="hover:text-blue-300 transition">Liên hệ</a></li>
        </ul>
      </nav>
    </header>
  );
}