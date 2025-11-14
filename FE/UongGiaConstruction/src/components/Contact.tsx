// src/components/Contact.tsx
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { userConsultationApi, type UserConsultationRequest } from '../api/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const { ref, isInView } = useInView({ threshold: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const requestData: UserConsultationRequest = {
        guestName: formData.name,
        guestPhoneNumber: formData.phone,
        email: formData.email,
      };

      const response = await userConsultationApi.create(requestData);
      
      setSubmitStatus({
        type: 'success',
        message: response.data.message || 'Gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn sớm.'
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting consultation:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-16 px-4 bg-gray-50">
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
            {/* Status Message */}
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Họ và tên *</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập họ và tên của bạn"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition transform ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}