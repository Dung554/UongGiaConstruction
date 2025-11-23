// AdminFE environment config — reuse FE logic
const isDevelopment = import.meta.env.MODE === 'development'

export const environment = {
  production: !isDevelopment,
  apiUrl: isDevelopment ? 'http://localhost:8080' : 'https://your-production-domain.com',
}

export default environment
