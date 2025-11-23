// AdminFE environment config — reuse FE logic
const isDevelopment = import.meta.env.MODE === 'development'

export const environment = {
  production: !isDevelopment,
  apiUrl: isDevelopment ? 'http://localhost:8080' : 'https://your-production-domain.com',
  getImageUrl: (path: string) => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    let cleanPath = path.replace(/\\/g, '/')
    if (cleanPath.startsWith('BE/')) cleanPath = cleanPath.substring(3)
    cleanPath = cleanPath.replace(/^\/+/, '')
    return `${isDevelopment ? 'http://localhost:8080' : 'https://your-production-domain.com'}/${cleanPath}`
  }
}

export default environment
