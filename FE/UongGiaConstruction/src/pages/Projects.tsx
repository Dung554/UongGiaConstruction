// src/pages/Projects.tsx
import { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Users, X, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: string;
  team: number;
  details: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Dự án nhà ở cao tầng',
    location: 'Quận 1, TP.HCM',
    image: 'bg-gradient-to-br from-blue-400 to-blue-600',
    description: 'Tòa nhà cao tầng hiện đại với 35 tầng',
    startDate: '2022-01-15',
    endDate: '2024-06-30',
    budget: '150 tỷ VNĐ',
    team: 150,
    details: 'Dự án tòa nhà cao tầng đa năng với thiết kế hiện đại, được xây dựng với công nghệ BIM 3D tiên tiến. Bao gồm các căn hộ sang trọng, văn phòng cho thuê, và các tiện ích thương mại.',
    features: [
      'Thiết kế kiến trúc đẳng cấp quốc tế',
      'Hệ thống điều hòa trung tâm thông minh',
      'Bãi đỗ xe tự động',
      'Gym, hồ bơi, phòng yoga',
      'Khu vui chơi trẻ em',
      'Siêu thị, nhà hàng, quán cà phê'
    ]
  },
  {
    id: 2,
    title: 'Trung tâm thương mại',
    location: 'Quận 3, TP.HCM',
    image: 'bg-gradient-to-br from-blue-500 to-blue-700',
    description: 'Shopping mall hiện đại 8 tầng',
    startDate: '2021-06-01',
    endDate: '2023-12-15',
    budget: '200 tỷ VNĐ',
    team: 200,
    details: 'Trung tâm thương mại hàng đầu với diện tích 120,000 m² bao gồm các cửa hàng bán lẻ, nhà hàng, rạp chiếu phim, và khu vui chơi giải trí.',
    features: [
      'Diện tích 120,000 m²',
      'Hơn 500 cửa hàng bán lẻ',
      'Rạp chiếu phim 10 phòng chiếu',
      'Khu ăn uống đa dạng',
      'Khu vui chơi trẻ em toàn cầu',
      'Bãi đỗ xe dự lượng 3,000 ô'
    ]
  },
  {
    id: 3,
    title: 'Khu công nghiệp',
    location: 'Bình Dương',
    image: 'bg-gradient-to-br from-blue-600 to-blue-800',
    description: 'Khu công nghiệp cao cấp 500 hecta',
    startDate: '2020-03-10',
    endDate: '2024-02-28',
    budget: '500 tỷ VNĐ',
    team: 300,
    details: 'Khu công nghiệp tiêu chuẩn quốc tế với đầy đủ tiện ích hỗ trợ các nhà máy sản xuất, xuất nhập khẩu hàng hóa.',
    features: [
      'Diện tích 500 hecta',
      'Hạ tầng giao thông hoàn chỉnh',
      'Hệ thống cấp nước và thoát nước',
      'Trạm điện, máy phát điện dự phòng',
      'Nhà quản lý và văn phòng',
      'Kho tàng lạnh và kho thường'
    ]
  },
  {
    id: 4,
    title: 'Dự án resort biển',
    location: 'Nha Trang, Khánh Hòa',
    image: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    description: 'Resort 5 sao hạng sang bên bờ biển',
    startDate: '2021-09-01',
    endDate: '2024-05-20',
    budget: '300 tỷ VNĐ',
    team: 250,
    details: 'Resort 5 sao sang trọng với 200 phòng nghỉ, spa, nhà hàng, bãi biển riêng và các tiện ích giải trí cao cấp.',
    features: [
      '200 phòng nghỉ hạng sang',
      'Bãi biển riêng 2km',
      'Spa và trung tâm wellness',
      'Nhà hàng 5 sao quốc tế',
      'Hồ bơi vô cực',
      'Sân golf 18 lỗ'
    ]
  },
  {
    id: 5,
    title: 'Khu đô thị sinh thái',
    location: 'Đà Nẵng',
    image: 'bg-gradient-to-br from-green-400 to-blue-600',
    description: 'Khu đô thị xanh bền vững 200 hecta',
    startDate: '2022-05-15',
    endDate: '2025-12-31',
    budget: '400 tỷ VNĐ',
    team: 280,
    details: 'Khu đô thị sinh thái xanh với kiến trúc bền vững, công viên cây xanh, hồ nước, và các tiện ích dân sinh hoàn chỉnh.',
    features: [
      'Diện tích 200 hecta',
      '30% diện tích cây xanh',
      '5,000 căn hộ',
      'Các trường học quốc tế',
      'Bệnh viện tư nhân',
      'Công viên trung tâm 50 hecta'
    ]
  },
  {
    id: 6,
    title: 'Dự án văn phòng IFC',
    location: 'Quận 1, TP.HCM',
    image: 'bg-gradient-to-br from-slate-500 to-blue-700',
    description: 'Tòa nhà văn phòng hạng A 42 tầng',
    startDate: '2021-12-01',
    endDate: '2024-11-15',
    budget: '250 tỷ VNĐ',
    team: 180,
    details: 'Tòa nhà văn phòng hạng A với tiêu chuẩn quốc tế, được chứng nhận LEED Platinum cho tính bền vững.',
    features: [
      '42 tầng văn phòng',
      'Sàn doanh nghiệp 1,500-3,000 m²',
      'Hệ thống an ninh 24/7',
      'Thang máy cao tốc',
      'Bãi đỗ xe 5 tầng',
      'Phòng họp, sự kiện hiện đại'
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Các Dự Án Đã Hoàn Thành</h1>
          <p className="text-gray-600 text-lg">Khám phá các dự án xây dựng nổi bật của chúng tôi</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer group ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={isInView ? { animationDelay: `${idx * 0.1}s` } : {}}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className={`${project.image} h-48 flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                    <Eye className="opacity-0 group-hover:opacity-100 transition" size={32} />
                  </div>
                  Dự án {project.id}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{project.title}</h3>
                  <div className="flex items-center text-gray-600 gap-2 mb-3">
                    <MapPin size={18} />
                    <p className="text-sm">{project.location}</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Ngân sách</p>
                      <p className="font-semibold text-blue-900">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Số nhân viên</p>
                      <p className="font-semibold text-blue-900">{project.team} người</p>
                    </div>
                  </div>

                  <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal/Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in`}>
            {/* Modal Header */}
            <div className={`${selectedProject.image} h-64 relative flex items-end justify-between p-6`}>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Description */}
              <p className="text-gray-700 text-lg mb-6">{selectedProject.details}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="flex items-center text-blue-600 mb-2">
                    <MapPin size={20} className="mr-2" />
                    <span className="text-sm font-semibold">Địa điểm</span>
                  </div>
                  <p className="text-gray-700">{selectedProject.location}</p>
                </div>

                <div>
                  <div className="flex items-center text-blue-600 mb-2">
                    <Calendar size={20} className="mr-2" />
                    <span className="text-sm font-semibold">Thời gian</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {new Date(selectedProject.startDate).toLocaleDateString('vi-VN')} - {new Date(selectedProject.endDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-blue-600 mb-2">
                    <DollarSign size={20} className="mr-2" />
                    <span className="text-sm font-semibold">Ngân sách</span>
                  </div>
                  <p className="text-gray-700 font-bold">{selectedProject.budget}</p>
                </div>

                <div>
                  <div className="flex items-center text-blue-600 mb-2">
                    <Users size={20} className="mr-2" />
                    <span className="text-sm font-semibold">Nhân viên</span>
                  </div>
                  <p className="text-gray-700">{selectedProject.team} người</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Các tính năng chính</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 font-bold mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}