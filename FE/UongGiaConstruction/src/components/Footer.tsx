// src/components/Footer.tsx
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="text-blue-200 text-sm">Công ty hàng đầu trong lĩnh vực xây dựng và phát triển bất động sản tại Việt Nam.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Dịch vụ</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Tư vấn thiết kế</a></li>
              <li><a href="#" className="hover:text-white transition">Thi công xây dựng</a></li>
              <li><a href="#" className="hover:text-white transition">Quản lý dự án</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>TP.HCM: +84 28 3823 1234</li>
              <li>Hà Nội: +84 24 3823 5678</li>
              <li>Email: info@construction.vn</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Mạng xã hội</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-300 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-300 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-300 transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-blue-300 transition"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; 2024 Công ty Kiến tạo Công trình. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}