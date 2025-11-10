// src/components/Services.tsx
import { Hammer, Briefcase, Users, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const services: Service[] = [
    {
      id: 1,
      title: 'Tư vấn thiết kế',
      description: 'Đội ngũ kiến trúc sư giàu kinh nghiệm sẽ tư vấn thiết kế công trình phù hợp với yêu cầu của bạn.',
      icon: <Briefcase size={32} className="text-blue-600" />
    },
    {
      id: 2,
      title: 'Thi công xây dựng',
      description: 'Công tác thi công được thực hiện bởi các đội thợ lành nghề với quy trình kỹ thuật chặt chẽ.',
      icon: <Hammer size={32} className="text-blue-600" />
    },
    {
      id: 3,
      title: 'Quản lý dự án',
      description: 'Quản lý toàn bộ quá trình thực hiện từ khâu thiết kế đến hoàn thành công trình.',
      icon: <Users size={32} className="text-blue-600" />
    },
    {
      id: 4,
      title: 'Đảm bảo chất lượng',
      description: 'Kiểm tra chất lượng toàn bộ công trình theo tiêu chuẩn xây dựng hiện hành.',
      icon: <Shield size={32} className="text-blue-600" />
    }
  ];

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center ${isInView ? 'animate-fade-in-down' : 'opacity-0'}`}>
          Dịch vụ của chúng tôi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`bg-blue-50 p-8 rounded-lg hover:shadow-lg transition transform hover:scale-105 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={isInView ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <div className="mb-4 transform transition hover:scale-110">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}