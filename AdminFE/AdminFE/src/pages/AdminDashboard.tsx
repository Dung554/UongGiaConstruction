import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import { typicalProject, userConsultation } from '../api/api'
import { useNavigate } from 'react-router-dom'

const DashboardTab: React.FC = () => <div>Welcome to Admin Dashboard</div>

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
  const [pictures, setPictures] = useState<File[]>([])
  const [saving, setSaving] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setThumbnail(e.target.files[0])
  }
  const handlePictures = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setPictures(Array.from(e.target.files))
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
          <input type="file" accept="image/*" onChange={handleFile} className="mt-1" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Hình khác (có thể chọn nhiều)</label>
          <input type="file" accept="image/*" multiple onChange={handlePictures} className="mt-1" />
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

  return (
    <div className="bg-gray-50 p-4 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Quản lý hỗ trợ khách hàng</h3>
        <button onClick={fetch} className="px-3 py-1 bg-white border rounded hover:bg-gray-50">Làm mới</button>
      </div>

      {loading && <div className="text-gray-600 mt-4">Đang tải...</div>}

      {!loading && list.length === 0 && <div className="text-gray-600 mt-4">Chưa có yêu cầu hỗ trợ</div>}

      {!loading && list.length > 0 && (
        <div className="grid gap-4 mt-4">
          {list.map((item: any) => (
            <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-900">{item.name || item.email}</div>
                  <div className="text-sm text-gray-600">{item.phone}</div>
                  <div className="mt-2 text-gray-700">{item.message || item.content || ''}</div>
                </div>
                <div className="min-w-[200px]">
                  <label className="block text-sm text-gray-600 mb-1">Trạng thái</label>
                  <select value={item.status || ''} onChange={(e)=>changeStatus(item.id, e.target.value)} className="w-full border border-gray-200 rounded p-2">
                    <option value="">-- Chọn --</option>
                    {statuses.map((s:any)=> <option key={s.key} value={s.key}>{s.value || s.name || s.key}</option>)}
                  </select>
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
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Quản lý dự án' },
    { id: 'support', label: 'Quản lý hỗ trợ' },
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
