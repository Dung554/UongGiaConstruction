// src/pages/Projects.tsx
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Maximize2, X, Eye, Loader, Home, Building2, Bed } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { typicalProjectApi, type TypicalProjectResponse, type TypicalProjectDetailResponse } from '../api/api.ts';

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  description: string;
  date: string;
  square: number;
  thumbnailURL: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<TypicalProjectDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await typicalProjectApi.getAll();
        
        if (response.data.data) {
          const mappedProjects: Project[] = response.data.data.map((item: TypicalProjectResponse) => ({
            id: item.typicalProjectId,
            title: item.name,
            location: item.location,
            image: item.thumbnailURL || 'bg-gradient-to-br from-blue-400 to-blue-600',
            description: item.description,
            date: item.date,
            square: item.square,
            thumbnailURL: item.thumbnailURL
          }));
          setProjects(mappedProjects);
        }
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError('Không thể tải danh sách dự án. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    window.scrollTo(0, 0);
  }, []);

  // Fetch project detail when clicked
  const handleProjectClick = async (projectId: number) => {
    try {
      setLoadingDetail(true);
      const response = await typicalProjectApi.getById(projectId);
      
      if (response.data.data) {
        setSelectedProject(response.data.data);
      }
    } catch (err: any) {
      console.error('Error fetching project detail:', err);
      alert('Không thể tải chi tiết dự án. Vui lòng thử lại.');
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Các Dự Án Tiêu Biểu</h1>
          <p className="text-gray-600 text-lg">Khám phá các dự án xây dựng nổi bật của chúng tôi</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin text-blue-600" size={48} />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Chưa có dự án nào được công bố.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer group ${
                    isInView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={isInView ? { animationDelay: `${idx * 0.1}s` } : {}}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden bg-gray-200">
                    {project.thumbnailURL ? (
                      <img 
                        src={project.thumbnailURL} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`${project.image} w-full h-full flex items-center justify-center text-white text-3xl font-bold`}>
                        {project.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                      <Eye className="opacity-0 group-hover:opacity-100 transition text-white" size={32} />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">{project.title}</h3>
                    <div className="flex items-center text-gray-600 gap-2 mb-3">
                      <MapPin size={18} className="flex-shrink-0" />
                      <p className="text-sm line-clamp-1">{project.location}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Diện tích</p>
                        <p className="font-semibold text-blue-900">{project.square.toLocaleString()} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày hoàn thành</p>
                        <p className="font-semibold text-blue-900 text-sm">
                          {new Date(project.date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>

                    <button
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal/Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-scale-in max-h-[95vh] overflow-y-auto">
            {loadingDetail ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="animate-spin text-blue-600" size={48} />
              </div>
            ) : (
              <>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10"
                >
                  <X size={24} className="text-gray-700" />
                </button>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pr-12">
                    {selectedProject.name}
                  </h2>

                  {/* Project Info List */}
                  <div className="space-y-4 mb-6">
                    {/* Owner/Name */}
                    <div>
                      <span className="font-semibold text-gray-900">- Chủ đầu tư: </span>
                      <span className="text-gray-700">{selectedProject.name}</span>
                    </div>

                    {/* Location */}
                    <div>
                      <span className="font-semibold text-gray-900">- Địa điểm: </span>
                      <span className="text-gray-700">{selectedProject.location}</span>
                    </div>

                    {/* Description */}
                    <div>
                      <span className="font-semibold text-gray-900">- Công trình được thiết kế bởi: </span>
                      <span className="text-gray-700">{selectedProject.description || 'Đang cập nhật'}</span>
                    </div>

                    {/* Specifications */}
                    <div className="ml-6 space-y-2">
                      {/* Area */}
                      <div className="flex items-start">
                        <span className="text-gray-900 mr-2">■</span>
                        <div>
                          <span className="font-semibold text-gray-900">Diện tích lô đất: </span>
                          <span className="text-gray-700">{selectedProject.square.toLocaleString()}m²</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-start">
                        <span className="text-gray-900 mr-2">■</span>
                        <div>
                          <span className="font-semibold text-gray-900">Ngày hoàn thành: </span>
                          <span className="text-gray-700">
                            {new Date(selectedProject.date).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Images Gallery */}
                  {selectedProject.pictureURLs && selectedProject.pictureURLs.length > 0 && (
                    <div className="space-y-4">
                      {selectedProject.pictureURLs.map((url, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={url}
                            alt={`${selectedProject.name} - Hình ${idx + 1}`}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Thumbnail if no other images */}
                  {(!selectedProject.pictureURLs || selectedProject.pictureURLs.length === 0) && selectedProject.thumbnailURL && (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={selectedProject.thumbnailURL}
                          alt={selectedProject.name}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Close Button at Bottom */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}