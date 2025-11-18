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

export interface TypicalProjectResponse {
  typicalProjectId: number;
  name: string;
  description: string;
  thumbnailURL: string;
  date: string;
  square: number;
  location: string;
}

export interface TypicalProjectDetailResponse extends TypicalProjectResponse {
  pictureURLs?: string[];
  // Add other detail fields if needed
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

export const typicalProjectApi = {
  getAll: () => 
    apiClient.get<ApiResponse<TypicalProjectResponse[]>>('/typicalProject/getAll'),
  
  getById: (id: number) => 
    apiClient.get<ApiResponse<TypicalProjectDetailResponse>>(`/typicalProject/getById/${id}`),
};

export default apiClient;