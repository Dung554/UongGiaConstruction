// src/components/Contact.tsx
import { useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { ref, isInView } = useInView({ threshold: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section ref={ref} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center ${isInView ? 'animate-fade-in-down' : 'opacity-0'}`}>
          Liên hệ với chúng tôi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className={`${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Thông tin liên hệ</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-blue-900 mb-2">Địa chỉ</p>
                <p className="text-gray-600">123 Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-2">Điện thoại</p>
                <p className="text-gray-600">+84 28 3823 1234</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-2">Email</p>
                <p className="text-gray-600">info@construction.vn</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-2">Giờ làm việc</p>
                <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                <p className="text-gray-600">Thứ 7, Chủ nhật: 9:00 - 12:00</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-lg shadow-lg ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="mb-6">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                placeholder="Tin nhắn"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}