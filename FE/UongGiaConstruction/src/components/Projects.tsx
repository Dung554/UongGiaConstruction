// src/components/Projects.tsx
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
}

export default function Projects() {
  const navigate = useNavigate();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const projects: Project[] = [
    {
      id: 1,
      title: 'Dự án nhà ở cao tầng',
      location: 'Quận 1, TP.HCM',
      image: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: 'Trung tâm thương mại',
      location: 'Quận 3, TP.HCM',
      image: 'bg-gradient-to-br from-blue-500 to-blue-700'
    },
    {
      id: 3,
      title: 'Khu công nghiệp',
      location: 'Bình Dương',
      image: 'bg-gradient-to-br from-blue-600 to-blue-800'
    }
  ];

  return (
    <section ref={ref} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center ${isInView ? 'animate-fade-in-down' : 'opacity-0'}`}>
          Công trình đã hoàn thành
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={isInView ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <div className={`${project.image} h-48 flex items-center justify-center text-white text-2xl font-bold`}>
                Dự án {project.id}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{project.title}</h3>
                <div className="flex items-center text-gray-600 gap-2">
                  <MapPin size={18} />
                  <p>{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <button onClick={() => navigate('/projects')} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">
            Xem tất cả dự án
          </button>
        </div>
      </div>
    </section>
  );
} 