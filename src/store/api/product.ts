import axios from 'axios';
import { InputProductType } from '../types/product';
const API = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchProduct = () => API.get('/api/v1/product');
export const createProduct = (product: InputProductType) =>
  API.post('/api/v1/product', product);
export const updateProduct = (product: InputProductType, id: number) =>
  API.put(`/api/v1/product/${id}`, product);

export const removeProduct = (id: number) =>
  API.delete(`/api/v1/product/${id}`);
