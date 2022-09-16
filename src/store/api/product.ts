import axios from 'axios';
import { AddInputProductType, UpdateInputProductType } from '../types/product';
const API = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchProduct = () => API.get('/api/v1/product');
export const createProduct = (product: AddInputProductType) =>
  API.post('/api/v1/product', product);
export const updateProduct = (product: UpdateInputProductType) =>
  API.put(`/api/v1/product/${product.id}`, product);

export const removeProduct = (id: number) =>
  API.delete(`/api/v1/product/${id}`);
