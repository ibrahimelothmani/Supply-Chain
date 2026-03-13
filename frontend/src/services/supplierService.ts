import api from './api';

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface SupplierRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

const supplierService = {
  getAll: async (): Promise<Supplier[]> => {
    const response = await api.get<Supplier[]>('/suppliers');
    return response.data;
  },

  getById: async (id: number): Promise<Supplier> => {
    const response = await api.get<Supplier>(`/suppliers/${id}`);
    return response.data;
  },

  create: async (data: SupplierRequest): Promise<Supplier> => {
    const response = await api.post<Supplier>('/suppliers', data);
    return response.data;
  },

  update: async (id: number, data: SupplierRequest): Promise<Supplier> => {
    const response = await api.put<Supplier>(`/suppliers/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/suppliers/${id}`);
  },

  search: async (name: string): Promise<Supplier[]> => {
    const response = await api.get<Supplier[]>(`/suppliers/search?name=${name}`);
    return response.data;
  },
};

export default supplierService;
