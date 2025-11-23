import React, { useState, useEffect, useRef } from 'react'
import AdminHeader from '../components/AdminHeader'
import { typicalProject, userConsultation } from '../api/api'
import { useNavigate } from 'react-router-dom'

const DashboardTab: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Chào mừng đến với Hệ thống Quản lý
          </h1>
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">
            Gói Thầu Xây Dựng
          </h2>
          <p className="text-lg text-gray-600">
            Quản lý dự án và yêu cầu khách hàng một cách hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Quản lý Dự án
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Tạo, chỉnh sửa và quản lý các dự án tiêu biểu của công ty
            </p>
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                Nhấn tab "Quản lý dự án" để bắt đầu
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Quản lý Yêu cầu
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Xem và cập nhật trạng thái các yêu cầu từ khách hàng
            </p>
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                Nhấn tab "Quản lý yêu cầu" để xem
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Tính năng chính
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Quản lý danh sách dự án tiêu biểu với đầy đủ thông tin và hình ảnh</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Theo dõi và cập nhật trạng thái yêu cầu tư vấn từ khách hàng</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Giao diện thân thiện, dễ sử dụng và tối ưu cho mọi thiết bị</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* Projects admin: list + create/update/delete using typicalProject endpoints */
const ProjectsTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const r = await typicalProject.getAll()
      setList(r.data?.data || r.data || [])
    } catch (e) {
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])

  const openCreate = () => { setEditing(null); setShowForm(true) }
  const openEdit = (item: any) => { setEditing(item); setShowForm(true) }

  const onDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return
    try {
      await typicalProject.delete(id)
      await fetch()
      alert('Xóa thành công')
    } catch (e: any) {
      alert('Xóa thất bại: ' + (e?.response?.data?.message || e.message))
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Dự án tiêu biểu</h3>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Tạo dự án mới</button>
          <button onClick={fetch} className="px-3 py-1 bg-white border rounded hover:bg-gray-50">Làm mới</button>
        </div>
      </div>

      {loading && <div className="text-gray-600 mt-4">Đang tải...</div>}

      {!loading && list.length === 0 && <div className="text-gray-600 mt-4">Không có dự án</div>}

      {!loading && list.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {list.map((p: any) => (
            <ProjectCard key={p.typicalProjectId || p.id} p={p} onEdit={openEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); fetch(); }}
        />
      )}
    </div>
  )
}

const ProjectCard: React.FC<{ p: any; onEdit: (p:any)=>void; onDelete:(id:number)=>void }> = ({ p, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const id = p.typicalProjectId || p.id
  const view = () => navigate(`/admin/project/${id}`)
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
      <h4 className="text-lg font-medium text-gray-900">{p.name || p.title}</h4>
      <p className="text-sm text-gray-600 my-2">{p.location}</p>
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(p)} className="px-2 py-1 text-sm bg-yellow-50 text-yellow-800 rounded hover:bg-yellow-100">Sửa</button>
        <button onClick={() => onDelete(id)} className="px-2 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100">Xóa</button>
        <button onClick={view} className="px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">Xem chi tiết</button>
      </div>
    </div>
  )
}

const ProjectForm: React.FC<{ initial?: any; onClose: () => void; onSaved: () => void }> = ({ initial, onClose, onSaved }) => {
  const [name, setName] = useState(initial?.name || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [location, setLocation] = useState(initial?.location || '')
  const [square, setSquare] = useState(initial?.square || '')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [pictures, setPictures] = useState<File[]>([])
  const [picturesPreview, setPicturesPreview] = useState<string[]>([])
  const thumbnailRef = useRef<HTMLInputElement | null>(null)
  const picturesRef = useRef<HTMLInputElement | null>(null)
  const [saving, setSaving] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const f = e.target.files[0]
    setThumbnail(f)
    setThumbnailPreview(URL.createObjectURL(f))
  }
  const handlePictures = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const arr = Array.from(e.target.files)
    setPictures(arr)
    setPicturesPreview(arr.map((f) => URL.createObjectURL(f)))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const form = new FormData()
      form.append('name', name)
      form.append('description', description)
      form.append('location', location)
      form.append('square', String(square))
      if (thumbnail) form.append('thumbnail', thumbnail)
      pictures.forEach((f) => form.append('pictureURL', f))

      if (initial && (initial.typicalProjectId || initial.id)) {
        const id = initial.typicalProjectId || initial.id
        await typicalProject.update(id, form)
        alert('Cập nhật thành công')
      } else {
        await typicalProject.create(form)
        alert('Tạo dự án thành công')
      }
      onSaved()
    } catch (e: any) {
      alert('Lỗi khi lưu: ' + (e?.response?.data?.message || e.message))
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
        <h3 className="text-lg font-semibold">{initial ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}</h3>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tên</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded p-2" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded p-2" />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diện tích</label>
            <input value={square} onChange={(e)=>setSquare(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded p-2" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <div className="mt-2 flex items-center gap-3">
            <button type="button" onClick={()=>thumbnailRef.current?.click()} className="px-3 py-2 bg-white border rounded">Chọn ảnh</button>
            {thumbnail && <div className="text-sm text-gray-600">{thumbnail.name}</div>}
            {thumbnailPreview && <img src={thumbnailPreview} alt="thumb" className="w-20 h-12 object-cover rounded" />}
          </div>
          <input ref={thumbnailRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Hình khác (có thể chọn nhiều)</label>
          <div className="mt-2 flex items-center gap-3">
            <button type="button" onClick={()=>picturesRef.current?.click()} className="px-3 py-2 bg-white border rounded">Chọn nhiều ảnh</button>
            {pictures.length > 0 && <div className="text-sm text-gray-600">{pictures.length} ảnh đã chọn</div>}
          </div>
          <input ref={picturesRef} type="file" accept="image/*" multiple onChange={handlePictures} className="hidden" />
          {picturesPreview.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {picturesPreview.map((src, idx) => (
                <img key={idx} src={src} className="w-full h-20 object-cover rounded" alt={`preview-${idx}`} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? 'Đang lưu...' : 'Lưu'}</button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Hủy</button>
        </div>
      </form>
    </div>
  )
}

/* Support management: show consultations and allow updating status */
const SupportTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  const [statuses, setStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const [r1, r2] = await Promise.all([userConsultation.getAllConsultations(), userConsultation.getAllStatus()])
      setList(r1.data?.data || r1.data || [])
      setStatuses(r2.data?.data || r2.data || [])
    } catch (e) {
      setList([])
      setStatuses([])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const changeStatus = async (id: number, statusKey: string) => {
    try {
      await userConsultation.updateStatus(id, { status: statusKey })
      await fetch()
      alert('Cập nhật trạng thái thành công')
    } catch (e: any) {
      alert('Cập nhật thất bại: ' + (e?.response?.data?.message || e.message))
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <div className="bg-gray-50 p-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Quản lý yêu cầu khách hàng</h3>
        <button onClick={fetch} className="px-3 py-1 bg-white border rounded hover:bg-gray-50">Làm mới</button>
      </div>

      {loading && <div className="text-gray-600 mt-4">Đang tải...</div>}

      {!loading && list.length === 0 && <div className="text-gray-600 mt-4">Chưa có yêu cầu hỗ trợ</div>}

      {!loading && list.length > 0 && (
        <div className="grid gap-4 mt-4">
          {list.map((item: any) => (
            <div key={item.userConsultationId} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-lg">{item.guestName}</div>
                      <div className="mt-1 space-y-1">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">SĐT:</span> {item.guestPhoneNumber}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span> {item.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Ngày tạo:</span> {formatDate(item.createDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái hiện tại</label>
                    <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                      item.status === 'NEW' ? 'bg-blue-100 text-blue-800' : 
                      item.status === 'CONTACTED' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cập nhật trạng thái</label>
                    <select 
                      value={item.status || ''} 
                      onChange={(e) => changeStatus(item.userConsultationId, e.target.value)} 
                      className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Chọn trạng thái --</option>
                      {statuses.map((s: any) => (
                        <option key={s.status} value={s.status}>
                          {s.status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const AdminDashboard: React.FC = () => {
  const tabs = [
    { id: 'dashboard', label: 'Trang chủ' },
    { id: 'projects', label: 'Quản lý dự án' },
    { id: 'support', label: 'Quản lý yêu cầu' },
  ]
  const [active, setActive] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-3 py-2 rounded ${active === t.id ? 'bg-gray-200' : 'bg-white border'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {active === 'dashboard' && <DashboardTab />}
          {active === 'projects' && <ProjectsTab />}
          {active === 'support' && <SupportTab />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard