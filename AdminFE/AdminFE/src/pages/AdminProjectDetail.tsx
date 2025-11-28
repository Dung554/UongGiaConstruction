import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { typicalProject } from '../api/api'
import environment from '../config/environment'

const AdminProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (!id) return
      try {
        setLoading(true)
        const res = await typicalProject.getById(id)
        const data = res.data?.data || res.data
        if (!data) {
          alert('Không tìm thấy dự án')
          navigate('/admin')
          return
        }

        // normalize image urls
        if (data.thumbnailURL) data.thumbnailURL = environment.getImageUrl(data.thumbnailURL)
        if (data.imageURLs && Array.isArray(data.imageURLs)) {
          data.imageURLs = data.imageURLs.map((it: any) => ({ ...it, url: environment.getImageUrl(it.url || it) }))
        }

        setProject(data)
      } catch (e) {
        console.error(e)
        alert('Lỗi khi tải chi tiết dự án')
        navigate('/admin')
      } finally { setLoading(false) }
    }
    fetch()
  }, [id, navigate])

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-4xl mx-auto p-6">Đang tải...</div>
    </div>
  )

  if (!project) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => navigate('/admin')} className="mb-4 px-3 py-1 bg-white border rounded">Quay lại</button>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-sm text-gray-600">{project.location}</p>
        <div className="mt-4 bg-white p-4 rounded-lg border border-gray-100">
          <h3 className="font-medium">Thông tin</h3>
          <p className="mt-2 text-gray-700">{project.description}</p>
          <p className="mt-2 text-gray-700">Diện tích: {project.square}</p>
          <p className="mt-2 text-gray-700">Ngày: {project.date}</p>
        </div>

        {/* Images */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Hình ảnh</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.imageURLs && project.imageURLs.length > 0 ? (
              project.imageURLs.map((img: any, idx: number) => (
                <div key={idx} className="rounded overflow-hidden bg-white">
                  <img src={img.url} alt={`img-${idx}`} className="w-full h-auto object-cover" onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = '' }} />
                </div>
              ))
            ) : project.thumbnailURL ? (
              <div className="rounded overflow-hidden bg-white">
                <img src={project.thumbnailURL} alt="thumbnail" className="w-full h-auto object-cover" />
              </div>
            ) : (
              <div className="text-gray-600">Không có ảnh</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProjectDetail
