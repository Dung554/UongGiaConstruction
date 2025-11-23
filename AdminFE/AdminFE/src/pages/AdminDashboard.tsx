import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import { users, projects, supports } from '../api/api'

const DashboardTab: React.FC = () => <div>Welcome to Admin Dashboard</div>

const UsersTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    users
      .list()
      .then((r) => setList(r.data?.data || r.data))
      .catch(() => setList([]))
  }, [])
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {list.map((u: any) => (
          <li key={u.id || u.username}>{u.username || u.name || JSON.stringify(u)}</li>
        ))}
      </ul>
    </div>
  )
}

const ProjectsTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    projects
      .list()
      .then((r) => setList(r.data?.data || r.data))
      .catch(() => setList([]))
  }, [])
  return (
    <div>
      <h3>Projects</h3>
      <ul>
        {list.map((p: any) => (
          <li key={p.id || p.title}>{p.title || JSON.stringify(p)}</li>
        ))}
      </ul>
    </div>
  )
}

const SupportTab: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    supports
      .list()
      .then((r) => setList(r.data?.data || r.data))
      .catch(() => setList([]))
  }, [])
  return (
    <div>
      <h3>Customer Support</h3>
      <ul>
        {list.map((s: any) => (
          <li key={s.id || s.subject}>{s.subject || JSON.stringify(s)}</li>
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
