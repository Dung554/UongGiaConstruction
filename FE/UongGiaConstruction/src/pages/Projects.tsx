import { useState, useEffect } from 'react';
import { MapPin, X, Eye, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { typicalProjectApi, type TypicalProjectResponse, type TypicalProjectDetailResponse } from '../api/api';
import { environment } from '../config/environment';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
            thumbnailURL: environment.getImageUrl(item.thumbnailURL)
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
      setCurrentImageIndex(0); // Reset to first image
      const response = await typicalProjectApi.getById(projectId);
      
      console.log('🔍 RAW API Response:', response.data.data);
      
      if (response.data.data) {
        const projectData = response.data.data;
        
        // Fix thumbnail URL
        if (projectData.thumbnailURL) {
          projectData.thumbnailURL = environment.getImageUrl(projectData.thumbnailURL);
        }
        
        // Fix image URLs
        if (projectData.imageURLs && projectData.imageURLs.length > 0) {
          projectData.imageURLs = projectData.imageURLs.map((img) => {
            return {
              ...img,
              url: environment.getImageUrl(img.url)
            };
          });
        }
        
        setSelectedProject(projectData);
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-scale-in max-h-[95vh] overflow-y-auto relative">
            {loadingDetail ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="animate-spin text-blue-600" size={48} />
              </div>
            ) : (
              <>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="sticky top-4 float-right mr-4 mt-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10"
                >
                  <X size={24} className="text-gray-700" />
                </button>

                {/* Modal Content */}
                <div className="p-6 clear-both">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
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
                      <span className="font-semibold text-gray-900">- Mô tả: </span>
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

                  {/* Project Images Gallery with Carousel */}
                  {selectedProject.imageURLs && selectedProject.imageURLs.length > 0 && (
                    <div className="space-y-4">
                      {/* Main Image Display */}
                      <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100">
                        <img 
                          src={selectedProject.imageURLs[currentImageIndex]?.url || ''}
                          alt={`${selectedProject.name} - Hình ${currentImageIndex + 1}`}
                          className="w-full h-auto object-cover max-h-[500px]"
                          onError={(e) => {
                            console.error('Image failed to load:', selectedProject.imageURLs?.[currentImageIndex]?.url);
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999"%3EKhông tải được ảnh%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        
                        {/* Navigation Buttons */}
                        {selectedProject.imageURLs.length > 1 && (
                          <>
                            {/* Previous Button */}
                            <button
                              onClick={() => setCurrentImageIndex(prev => 
                                prev === 0 ? selectedProject.imageURLs!.length - 1 : prev - 1
                              )}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition backdrop-blur-sm"
                              aria-label="Ảnh trước"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            
                            {/* Next Button */}
                            <button
                              onClick={() => setCurrentImageIndex(prev => 
                                prev === selectedProject.imageURLs!.length - 1 ? 0 : prev + 1
                              )}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition backdrop-blur-sm"
                              aria-label="Ảnh tiếp theo"
                            >
                              <ChevronRight size={24} />
                            </button>
                            
                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                              {currentImageIndex + 1} / {selectedProject.imageURLs.length}
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Thumbnail Navigation */}
                      {selectedProject.imageURLs.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {selectedProject.imageURLs.map((image, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                                idx === currentImageIndex 
                                  ? 'border-blue-600 ring-2 ring-blue-300' 
                                  : 'border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              <img 
                                src={image.url}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thumbnail if no other images */}
                  {(!selectedProject.imageURLs || selectedProject.imageURLs.length === 0) && selectedProject.thumbnailURL && (
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