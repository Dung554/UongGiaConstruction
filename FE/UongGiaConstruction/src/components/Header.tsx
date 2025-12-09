// src/components/Header.tsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    // Close mobile menu
    setIsOpen(false);

    // Check if we're on the home page
    if (location.pathname === "/") {
      // On home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // On other pages, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="bg-blue-950 text-white sticky top-0 z-50 ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src={logoImg}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex gap-8 absolute md:static top-16 left-0 right-0 md:gap-8 flex-col md:flex-row bg-blue-900 md:bg-transparent p-4 md:p-0 w-full md:w-auto`}
        >
          <li>
            <button
              onClick={() => handleNavigation("home")}
              className="hover:text-blue-300 transition w-full text-left md:w-auto"
            >
              Trang chủ
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("projects")}
              className="hover:text-blue-300 transition w-full text-left md:w-auto"
            >
              Dự án
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("services")}
              className="hover:text-blue-300 transition w-full text-left md:w-auto"
            >
              Dịch vụ
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("contact")}
              className="hover:text-blue-300 transition w-full text-left md:w-auto"
            >
              Liên hệ
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
