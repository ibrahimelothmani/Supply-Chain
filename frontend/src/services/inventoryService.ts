import api from './api';

export interface InventoryItem {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  warehouseId: number;
  warehouseName: string;
  quantity: number;
  reorderLevel: number;
  status: 'HEALTHY' | 'LOW' | 'CRITICAL';
  lastUpdated: string;
}

export interface InventoryRequest {
  productId: number;
  warehouseId: number;
  quantity: number;
}

const inventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    const response = await api.get<InventoryItem[]>('/inventory');
    return response.data;
  },

  getById: async (id: number): Promise<InventoryItem> => {
    const response = await api.get<InventoryItem>(`/inventory/${id}`);
    return response.data;
  },

  getByProduct: async (productId: number): Promise<InventoryItem[]> => {
    const response = await api.get<InventoryItem[]>(`/inventory/product/${productId}`);
    return response.data;
  },

  getByWarehouse: async (warehouseId: number): Promise<InventoryItem[]> => {
    const response = await api.get<InventoryItem[]>(`/inventory/warehouse/${warehouseId}`);
    return response.data;
  },

  createOrUpdate: async (data: InventoryRequest): Promise<InventoryItem> => {
    const response = await api.post<InventoryItem>('/inventory', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/inventory/${id}`);
  },
};

export default inventoryService;
