// src/config/environment.ts

interface Environment {
    production: boolean;
    apiUrl: string;
    getImageUrl: (path: string) => string;
  }
  
  const isDevelopment = import.meta.env.MODE === 'development';
  
  export const environment: Environment = {
    production: !isDevelopment,
    apiUrl: isDevelopment ? 'http://localhost:8080' : 'https://your-production-domain.com',
    
    getImageUrl: (path: string): string => {
      if (!path) return '';
      
      // If already a full URL, return as is
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }
      
      // Clean up the path
      let cleanPath = path;
      
      // Replace backslashes with forward slashes
      cleanPath = cleanPath.replace(/\\/g, '/');
      
      // Remove leading "BE/" if exists
      if (cleanPath.startsWith('BE/')) {
        cleanPath = cleanPath.substring(3); // Remove "BE/"
      }
      
      // Remove any leading slashes
      cleanPath = cleanPath.replace(/^\/+/, '');
      
      // Ensure the path starts with / for the URL
      cleanPath = '/' + cleanPath;
      
      // Return full URL
      const baseUrl = isDevelopment ? 'http://localhost:8080' : 'https://your-production-domain.com';
      
      // Debug logs (có thể comment out sau khi hoạt động tốt)
      console.log('🖼️ Image URL Conversion:');
      console.log('  Input:', path);
      console.log('  Output:', `${baseUrl}${cleanPath}`);
      
      return `${baseUrl}${cleanPath}`;
    }
  };
  
  export default environment;