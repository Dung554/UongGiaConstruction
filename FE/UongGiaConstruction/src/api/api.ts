// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UserConsultationRequest {
  guestName: string;
  guestPhoneNumber: string;
  email: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
}

export const userConsultationApi = {
  create: (data: UserConsultationRequest) => 
    apiClient.post<ApiResponse<void>>('/userConsultation/create', data),
  
  getAllConsultations: () => 
    apiClient.get<ApiResponse<any[]>>('/userConsultation/getAllConsultations'),
  
  getAllStatus: () => 
    apiClient.get<ApiResponse<any[]>>('/userConsultation/getAllStatus'),
  
  updateStatus: (id: number, status: any) => 
    apiClient.put<ApiResponse<void>>(`/userConsultation/updateStatus/${id}`, status),
};

export default apiClient;