import api from './api';

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  reorderLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  sku: string;
  description?: string;
  category: string;
  price?: number;
  reorderLevel?: number;
}

const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: ProductRequest): Promise<Product> => {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  update: async (id: number, data: ProductRequest): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },

  search: async (name: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/search?name=${name}`);
    return response.data;
  },
};

export default productService;
