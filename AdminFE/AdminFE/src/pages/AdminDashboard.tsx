import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import { typicalProject, userConsultation } from '../api/api'

const DashboardTab: React.FC = () => <div>Welcome to Admin Dashboard</div>

const UsersTab: React.FC = () => {
  // Backend currently does not expose a dedicated users management controller.
  // Show placeholder and instructions to add endpoints if admin wants full user CRUD.
  return (
    <div>
      <h3>Quản lý người dùng</h3>
      <p>Hiện tại backend không có API công khai để quản lý người dùng (no `/api/users` controller).</p>
      <p>Nếu bạn muốn, tôi có thể thêm UI để gọi các endpoint quản lý người dùng khi backend hỗ trợ (list/create/update/delete).</p>
    </div>
  )
}

const ProjectsTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    typicalProject
      .getAll()
      .then((r) => setList(r.data?.data || r.data))
      .catch(() => setList([]))
  }, [])
  return (
    <div>
      <h3>Dự án tiêu biểu</h3>
      <ul>
        {list.map((p: any) => (
          <li key={p.id || p.title}>{p.title || p.name || JSON.stringify(p)}</li>
        ))}
      </ul>
    </div>
  )
}

const SupportTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    userConsultation
      .getAllConsultations()
      .then((r) => setList(r.data?.data || r.data))
      .catch(() => setList([]))
  }, [])
  return (
    <div>
      <h3>Hỗ trợ khách hàng</h3>
      <ul>
        {list.map((s: any) => (
          <li key={s.id || s.email}>{s.name || s.email || JSON.stringify(s)}</li>
        ))}
      </ul>
    </div>
  )
}

const AdminDashboard: React.FC = () => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Quản lý người dùng' },
    { id: 'projects', label: 'Quản lý dự án' },
    { id: 'support', label: 'Quản lý hỗ trợ' },
  ]
  const [active, setActive] = useState('dashboard')

  return (
    <div>
      <AdminHeader />
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{ padding: '8px 12px', background: active === t.id ? '#eee' : '#fff' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {active === 'dashboard' && <DashboardTab />}
          {active === 'users' && <UsersTab />}
          {active === 'projects' && <ProjectsTab />}
          {active === 'support' && <SupportTab />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
