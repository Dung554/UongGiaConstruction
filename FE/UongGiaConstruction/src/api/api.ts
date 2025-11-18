// src/services/api.ts
import axios from 'axios';
import { environment } from '../config/environment';

const apiClient = axios.create({
  baseURL: environment.apiUrl + '/api',
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

export interface ImageResponse {
  imageId?: number;
  imageURL: string;
}

export interface TypicalProjectDetailResponse {
  name: string;
  description: string;
  thumbnailURL: string;
  date: string;
  square: number;
  location: string;
  imageURLs?: ImageResponse[];
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