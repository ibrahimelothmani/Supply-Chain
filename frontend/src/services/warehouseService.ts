import api from './api';

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  capacity: number;
  createdAt: string;
}

export interface WarehouseRequest {
  name: string;
  location: string;
  capacity?: number;
}

const warehouseService = {
  getAll: async (): Promise<Warehouse[]> => {
    const response = await api.get<Warehouse[]>('/warehouses');
    return response.data;
  },

  getById: async (id: number): Promise<Warehouse> => {
    const response = await api.get<Warehouse>(`/warehouses/${id}`);
    return response.data;
  },

  create: async (data: WarehouseRequest): Promise<Warehouse> => {
    const response = await api.post<Warehouse>('/warehouses', data);
    return response.data;
  },

  update: async (id: number, data: WarehouseRequest): Promise<Warehouse> => {
    const response = await api.put<Warehouse>(`/warehouses/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/warehouses/${id}`);
  },
};

export default warehouseService;
