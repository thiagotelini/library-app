import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export const booksApi = {
  list: () => api.get('/books').then(r => r.data),
  getById: (id) => api.get(`/books/${id}`).then(r => r.data),
  create: (data) => api.post('/books', data).then(r => r.data),
  update: (id, data) => api.put(`/books/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/books/${id}`).then(r => r.data),
};

export const customersApi = {
  list: () => api.get('/customers').then(r => r.data),
  getByCpf: (cpf) => api.get(`/customers/${cpf}`).then(r => r.data),
  create: (data) => api.post('/customers', data).then(r => r.data),
  update: (cpf, data) => api.put(`/customers/${cpf}`, data).then(r => r.data),
  delete: (cpf) => api.delete(`/customers/${cpf}`).then(r => r.data),
};
