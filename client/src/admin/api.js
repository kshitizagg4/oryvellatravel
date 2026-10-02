import axios from 'axios';

const admin = axios.create({ baseURL: '/api/admin' });

admin.interceptors.request.use((cfg) => {
  const key = localStorage.getItem('admin_key');
  if (key) cfg.headers['x-admin-key'] = key;
  return cfg;
});

export const adminPing = () => admin.get('/').then((r) => r.data);
export const adminList = (table, params) => admin.get(`/${table}`, { params }).then((r) => r.data);
export const adminGet = (table, id) => admin.get(`/${table}/${id}`).then((r) => r.data);
export const adminCreate = (table, body) => admin.post(`/${table}`, body).then((r) => r.data);
export const adminUpdate = (table, id, body) => admin.put(`/${table}/${id}`, body).then((r) => r.data);
export const adminDelete = (table, id) => admin.delete(`/${table}/${id}`);

export const isLoggedIn = () => localStorage.getItem('admin_key') !== null;
export const logout = () => localStorage.removeItem('admin_key');
