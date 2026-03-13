import api from './api';

export type MovementType = 'INBOUND' | 'OUTBOUND' | 'TRANSFER';

export interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  movementType: MovementType;
  quantity: number;
  reference: string;
  createdAt: string;
}

export interface StockMovementRequest {
  productId: number;
  warehouseId: number;
  movementType: MovementType;
  quantity: number;
  reference?: string;
}

const stockMovementService = {
  getAll: async (): Promise<StockMovement[]> => {
    const response = await api.get<StockMovement[]>('/stock-movements');
    return response.data;
  },

  getById: async (id: number): Promise<StockMovement> => {
    const response = await api.get<StockMovement>(`/stock-movements/${id}`);
    return response.data;
  },

  record: async (data: StockMovementRequest): Promise<StockMovement> => {
    const response = await api.post<StockMovement>('/stock-movements', data);
    return response.data;
  },

  getByProduct: async (productId: number): Promise<StockMovement[]> => {
    const response = await api.get<StockMovement[]>(`/stock-movements/product/${productId}`);
    return response.data;
  },

  getByWarehouse: async (warehouseId: number): Promise<StockMovement[]> => {
    const response = await api.get<StockMovement[]>(`/stock-movements/warehouse/${warehouseId}`);
    return response.data;
  },

  getByType: async (type: MovementType): Promise<StockMovement[]> => {
    const response = await api.get<StockMovement[]>(`/stock-movements/type/${type}`);
    return response.data;
  },
};

export default stockMovementService;
