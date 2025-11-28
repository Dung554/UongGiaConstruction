// src/pages/ProjectDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { typicalProjectApi, type TypicalProjectDetailResponse } from '../api/api';
import { environment } from '../config/environment';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<TypicalProjectDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await typicalProjectApi.getById(parseInt(id));
        
        if (response.data.data) {
          const projectData = response.data.data;
          
          // Fix thumbnail URL
          if (projectData.thumbnailURL) {
            projectData.thumbnailURL = environment.getImageUrl(projectData.thumbnailURL);
          }
          
          // Fix image URLs
          if (projectData.imageURLs && projectData.imageURLs.length > 0) {
            projectData.imageURLs = projectData.imageURLs.map((img) => ({
              ...img,
              url: environment.getImageUrl(img.url)
            }));
          }
          
          setProject(projectData);
        }
      } catch (err) {
        console.error('Error fetching project detail:', err);
        alert('Không thể tải chi tiết dự án. Vui lòng thử lại.');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center py-20">
          <Loader className="animate-spin text-blue-600" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center py-20">
          <p className="text-gray-600 text-lg">Không tìm thấy dự án.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Back Button */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-semibold"
          >
            <ArrowLeft size={20} />
            Quay lại danh sách dự án
          </button>
        </div>
      </section>

      {/* Project Detail Content */}
      <section className="flex-grow py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {project.name}
          </h1>

          {/* Project Info */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="space-y-4">
              {/* Owner */}

              {/* Location */}
              <div>
                <span className="font-semibold text-gray-900">Địa điểm: </span>
                <span className="text-gray-700">{project.location}</span>
              </div>

              {/* Description */}
              <div>
                <span className="font-semibold text-gray-900">Mô tả: </span>
                <span className="text-gray-700">{project.description || 'Đang cập nhật'}</span>
              </div>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                {/* Area */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Diện tích lô đất</p>
                  <p className="text-xl font-bold text-blue-900">{project.square.toLocaleString()} m²</p>
                </div>

                {/* Date */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ngày hoàn thành</p>
                  <p className="text-xl font-bold text-blue-900">
                    {new Date(project.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery - All Images Displayed */}
          {project.imageURLs && project.imageURLs.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Hình ảnh dự án ({project.imageURLs.length})
              </h2>
              
              {/* Display all images in grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {project.imageURLs.map((image, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
                  >
                    <img 
                      src={image.url}
                      alt={`${project.name} - Hình ${idx + 1}`}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        console.error('Image failed to load:', image.url);
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999"%3EKhông tải được ảnh%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : project.thumbnailURL ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Hình ảnh dự án</h2>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={project.thumbnailURL}
                  alt={project.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ) : null}
{/* Back to Top Button at Bottom */}
<div className="mt-12 pt-8 border-t border-gray-200">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-semibold text-lg"
  >
    <ArrowLeft size={24} className="rotate-90" />
    Quay lên đầu trang
  </button>
</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}